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
        return Response(status=status.HTTP_404_BAD_REQUEST)