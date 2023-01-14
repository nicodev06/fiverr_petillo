from rest_framework import generics
from core.models import Workspace
from campaings.models import Campaign, Lead
from .serializers import CampaignSerializer, LeadSerializer
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
    