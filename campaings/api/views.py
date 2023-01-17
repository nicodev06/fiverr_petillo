import io
import pandas
import time
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import FileUploadParser, MultiPartParser
from core.models import Workspace
from campaings.models import Campaign, Lead
from .serializers import CampaignSerializer, LeadSerializer, CsvUploadSerializer
from core.api.utils import EmailPagination 

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
        serializer.save(workspace=workspace)

class RetrieveUpdateDestroyCampaignAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer

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
        return Campaign.objects.filter(name__icontains=self.request.query_params.get('q')).order_by('-id')

class LeadListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer

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
    try:
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
            return Response(status=status.HTTP_201_CREATED)
    except:
        return Response(status.HTTP_400_BAD_REQUEST)
            
        
@api_view(['POST'])
def createLeadAPIView(request, pk):
    campaign = Campaign.objects.get(pk=pk)
    serializer = LeadSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(campaign=campaign)
        return Response(status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)