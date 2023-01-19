from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns'),
    path('campaign/<int:pk>/', views.RetrieveUpdateDestroyCampaignAPIView.as_view(), name='campaign'),
    path('campaign_search/', views.SearchInCampaignsAPIView.as_view(), name='campaigns search'),
    path('leads/<int:pk>/', views.LeadListCreateAPIView.as_view(), name='leads'),
    path('update_leads_fields/<int:pk>/', views.updateLeadsFieldsAPIView, name='update leads fields'),
    path('leads/columns/', views.leadsColumnsNameAPIView, name='leads columns'),
    path('leads/create/<int:pk>/', views.createLeadsFromCsv, name="create leads"),
    path('leads/create_manually/<int:pk>/', views.createLeadAPIView, name="create lead"),
    path('leads/<int:pk>/<str:status>/', views.filterLeadsAPIView.as_view(), name='filter leads'),
    path('leads/unsubscribe/', views.unsuscribeLeadsAPIView, name='unsubscribe leads'),
    path('leads/delete/', views.deleteLeadsAPIView, name='delete leads'),
    path('leads_search/<int:pk>/', views.SearchInLeadsAPIView.as_view(), name='leads search'),
    path('sequences/<int:pk>/', views.CreateSequenceAPIView.as_view(), name='sequences'),
    path('variants/<int:pk>/', views.CreateVariantAPIView.as_view(), name='variants')
]
