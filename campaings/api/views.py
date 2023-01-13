from rest_framework import generics
from core.models import Workspace
from campaings.models import Campaign
from .serializers import CampaignSerializer
from core.api.utils import EmailPagination 

class ListCreateCampaignAPIView(generics.ListCreateAPIView):
    queryset = Campaign.objects.all()
    serializer_class = CampaignSerializer
    pagination_class = EmailPagination

    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        status = self.request.query_params.get('status')
        if status:
            return Campaign.objects.filter(workspace=workspace, status=status).order_by('-id')
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
    