import io
import pandas
from string import ascii_uppercase
import datetime
from datetime import timedelta
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FileUploadParser, MultiPartParser
from core.models import Workspace, GenericSender
from campaings.models import Campaign, Lead, Sequence, Variant, Template
from .serializers import CampaignSerializer, LeadSerializer, CsvUploadSerializer, SequenceSerializer, VariantSerializer, TemplateSerializer
from core.api.utils import EmailPagination 
from .utils import LeadsPagination

from  ..tasks import send_mail, send_test_email

class ListCreateCampaignAPIView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    pagination_class = EmailPagination

    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        status = self.request.query_params.get('status')
        created_at = self.request.query_params.get('created_at')
        if status and created_at:
            return Campaign.objects.filter(workspace=workspace, status=status, created_at=created_at).order_by('-id')
        else:
            if status:
                return Campaign.objects.filter(workspace=workspace, status=status).order_by('-id')
            if created_at:
                return Campaign.objects.filter(workspace=workspace, created_at=created_at).order_by('-id')
        return Campaign.objects.filter(workspace=workspace).order_by('-id')
    
    def perform_create(self, serializer):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        serializer.save(workspace=workspace, leads_fields={})

class RetrieveUpdateDestroyCampaignAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    def perform_update(self, serializer):
        serializer.save()
        try:
            if serializer.validated_data['status'] == 'active':
                tomorrow = datetime.datetime.utcnow() + timedelta(seconds=10)
                send_mail.apply_async((self.kwargs['pk'],), eta=tomorrow)
        except KeyError:
            pass

class FilterCampaignsAPIView(generics.ListAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        return Campaign.objects.filter(workspace=workspace, status=self.request.query_params.get('status'))

class SearchInCampaignsAPIView(generics.ListAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    pagination_class = EmailPagination
    
    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        return Campaign.objects.filter(name__icontains=self.request.query_params.get('q'), workspace=workspace).order_by('-id')

class LeadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    pagination_class = LeadsPagination

    def get_queryset(self):
        campaign = Campaign.objects.get(pk=self.kwargs['pk'])
        return Lead.objects.filter(campaign=campaign).order_by('-id')

@api_view(['POST'])
@parser_classes([MultiPartParser])
def leadsColumnsNameAPIView(request): 
    try:
        serializer = CsvUploadSerializer(data=request.data)
        if serializer.is_valid():
            defaults = ['firstname', 'lastname', 'email', 'icebraker', 'personalisation', 'phonenumber', 'jobtitle', 'company']
            default_fields = []
            custom_fields = []
            samples = []
            csv_file = serializer.validated_data['file']
            with io.TextIOWrapper(csv_file, encoding="ISO-8859-1") as text_file:
                file_reader = pandas.read_csv(text_file)
                for (key, value) in file_reader.iloc[0:2, 0:].to_dict().items():
                    if ''.join(char for char in key if char.isalnum()).lower() in defaults:
                        default_fields.append(key)
                    else:
                        custom_fields.append(key)
                    samples.append(value[0])
            
            return Response({"default_fields": default_fields, "custom_fields": custom_fields, "samples": samples}, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

def match(field):
    defaults_fields = ['email', 'first_name', 'last_name', 'ice_braker', 'personalisation', 'phone_number', 'job_title', 'company', 'custom_fields']
    raw_field = ''.join(char for char in field if char.isalnum()).lower()
    for f in defaults_fields:
        if ''.join(char for char in f if char.isalnum()) == raw_field:
            return f

@api_view(['PUT'])
def updateLeadsFieldsAPIView(request, pk):
    try:
        default_fields = {}
        for field in request.data['defaultFields']:
            default_fields[match(field)] = field
        request.data['defaultFields'] = default_fields
        print(request.data['defaultFields'])
        Campaign.objects.filter(id=pk).update(leads_fields=request.data)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def createLeadsFromCsv(request,pk):
    
        serializer = CsvUploadSerializer(data=request.data)
        if serializer.is_valid():
            campaign = Campaign.objects.get(id=pk)
            default_fields = campaign.leads_fields['defaultFields']
            custom_fields = campaign.leads_fields['customFields']
            csv_file = serializer.validated_data['file']
            with io.TextIOWrapper(csv_file, encoding="ISO-8859-1") as text_file:
                file_reader = pandas.read_csv(text_file)
                for _, row in file_reader.iterrows():
                    data_dict = {}
                    for field in default_fields.keys():
                        data_dict[field] = row[default_fields[field]]
                    custom = {}
                    for field in custom_fields:
                        custom[field] = row[field]
                    print(custom)
                    lead = Lead(custom_fields=custom, campaign=campaign, **data_dict)
                    lead.save()
            total_senders_count = campaign.senders.count()
            if total_senders_count != 0:
                leads_count = Lead.objects.filter(campaign=campaign).count()
                email_per_sender = leads_count // total_senders_count
                campaign.email_per_sender = email_per_sender
                campaign.save()
            return Response(status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    #except:
        return Response(status=status.HTTP_400_BAD_REQUEST)
            
        
@api_view(['POST'])
def createLeadAPIView(request, pk):
    request.data['campaign'] = pk
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        campaign = Campaign.objects.get(pk=pk)
        total_senders_count = campaign.senders.count()
        if total_senders_count != 0:
            leads_count = Lead.objects.filter(campaign=campaign).count()
            email_per_sender = leads_count // total_senders_count
            campaign.email_per_sender = email_per_sender
            campaign.save()
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class filterLeadsAPIView(generics.ListAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

    def get_queryset(self):
        campaign = Campaign.objects.get(pk=self.kwargs['pk'])
        status = self.kwargs['status']
        value = self.request.query_params.get('q')
        if value == 1:
            value = True
        elif value == 0:
            value == False
        options = {}
        options[status] = value
        return Lead.objects.filter(campaign=campaign, **options)

@api_view(['PUT'])
def unsuscribeLeadsAPIView(request):
    try:
        for lead in request.data:
            Lead.objects.filter(id=lead['id']).update(subscribe=False)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteLeadsAPIView(request):
    try:
        for lead in request.data:
            Lead.objects.get(id=lead['id']).delete()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

class SearchInLeadsAPIView(generics.ListAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    pagination_class = LeadsPagination
    
    def get_queryset(self):
        campaign = Campaign.objects.get(id=self.kwargs['pk'])
        return Lead.objects.filter(email__icontains=self.request.query_params.get('q'), campaign=campaign).order_by('-id')


class CreateSequenceAPIView(generics.ListCreateAPIView):
    queryset = Sequence.objects.all()
    serializer_class = SequenceSerializer

    def get_queryset(self):
        campaign = Campaign.objects.get(id=self.kwargs['pk'])
        return Sequence.objects.filter(campaign=campaign)
    
    def perform_create(self, serializer):
        campaign = Campaign.objects.get(id=self.kwargs['pk'])
        name = f'Step{campaign.sequences.count() + 1}'
        serializer.save(campaign=campaign, name=name)


class CreateVariantAPIView(generics.ListCreateAPIView):
    queryset = Variant.objects.all()
    serializer_class = VariantSerializer

    def get_queryset(self):
        sequence = Sequence.objects.get(id=self.kwargs['pk'])
        return Variant.objects.filter(sequence=sequence)
    
    def perform_create(self, serializer):
        sequence = Sequence.objects.get(id=self.kwargs['pk'])
        name = ascii_uppercase[sequence.variants.count()]
        serializer.save(sequence=sequence, name=name)

@api_view(['DELETE'])
def deleteVariantAPIView(request, pk):
    try:
        variant = Variant.objects.get(pk=pk)
        if variant.sequence.variants.count() == 1:
            variant.sequence.delete()
        else:
            variant.delete()
        return Response(status=status.HTTP_202_ACCEPTED)
    except:
        return Response(status=status.HTTP_404_BAD_REQUEST)

@api_view(['PUT'])
def updateWaitingTime(request, pk):
    try:
        sequence = Sequence.objects.filter(pk=pk)
        sequence.update(waiting_time=request.query_params.get('q'))
        return Response({'data': 'correcly updated'}, status=status.HTTP_200_OK)
    except:
        return Response({'data': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def addSenderToCampaign(request, pk):
    try:
        campaign = Campaign.objects.get(pk=pk)
        sender = GenericSender.objects.get(pk=request.query_params.get('q'))
        campaign.senders.add(sender)
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status.status.HTTP_400_BAD_REQUEST)

class CreateTemplateAPIView(generics.ListCreateAPIView):

    queryset = Template.objects.all()
    serializer_class = TemplateSerializer

    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        return Template.objects.filter(workspace=workspace)

    def perform_create(self, serializer):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        serializer.save(workspace=workspace)

@api_view(['POST'])
def send_test_emails(request):
    send_test_email.delay(request.data['subject'], request.data['content'], request.data['emails'])
    return Response(status=status.HTTP_200_OK)


class RetrieveUpdateDestroyTemplateAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Template.objects.all()
    serializer_class = TemplateSerializer