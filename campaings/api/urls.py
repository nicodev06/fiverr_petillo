from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns'),
    path('campaign/<int:pk>/', views.RetrieveUpdateDestroyCampaignAPIView.as_view(), name='campaign'),
    path('campaign_search/', views.SearchInCampaignsAPIView.as_view(), name='campaign search'),
    path('leads/', views.LeadListCreateAPIView.as_view(), name='leads'),
    path('update_leads_fields/<int:pk>/', views.updateLeadsFieldsAPIView, name='update leads fields'),
    path('leads/columns/', views.leadsColumnsNameAPIView, name='leads columns'),
    path('leads/create/<int:pk>/', views.createLeadsFromCsv, name="create leads"),
    path('leads/create_manually/<int:pk>/', views.createLeadAPIView, name="create lead")
]
