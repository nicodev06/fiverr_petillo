from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns')
]
