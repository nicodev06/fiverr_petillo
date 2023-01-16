from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns'),
    path('campaign/<int:pk>/', views.RetrieveUpdateDestroyCampaignAPIView.as_view(), name='campaign'),
    path('campaign_search/', views.SearchInCampaignsAPIView.as_view(), name='campaign search'),
    path('leads/', views.LeadListCreateAPIView.as_view(), name='leads'),
    path('leads/columns/', views.leadsColumnsNameAPIView, name='leads columns')
]
