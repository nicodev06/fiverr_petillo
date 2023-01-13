from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns'),
    path('campaign/<int:pk>/', views.RetrieveUpdateDestroyCampaignAPIView.as_view(), name='campaign'),
    path('filter_campaigns/', views.FilterCampaignsAPIView.as_view(), name='filter campaigns')
]
