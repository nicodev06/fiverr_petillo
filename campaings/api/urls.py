from django.urls import path
from . import views

urlpatterns = [
    path('campaigns/', views.ListCreateCampaignAPIView.as_view(), name='campaigns'),
    path('campaign/<int:pk>/', views.RetrieveUpdateDestroyCampaignAPIView.as_view(), name='campaign'),
    path('campaign_search/', views.SearchInCampaignsAPIView.as_view(), name='campaigns search'),
    path('leads/<int:pk>/', views.LeadListCreateAPIView.as_view(), name='leads'),
    path('update_leads_fields/<int:pk>/', views.updateLeadsFieldsAPIView, name='update leads fields'),
    path('leads/columns/', views.leadsColumnsNameAPIView, name='leads columns'),
    path('leads/create/<int:pk>/', views.createLeadsFromCsv, name='create leads'),
    path('leads/create_manually/<int:pk>/', views.createLeadAPIView, name="create lead"),
    path('leads/<int:pk>/<str:status>/', views.filterLeadsAPIView.as_view(), name='filter leads'),
    path('leads/unsubscribe/', views.unsuscribeLeadsAPIView, name='unsubscribe leads'),
    path('leads/delete/', views.deleteLeadsAPIView, name='delete leads'),
    path('leads_search/<int:pk>/', views.SearchInLeadsAPIView.as_view(), name='leads search'),
    path('sequences/<int:pk>/', views.CreateSequenceAPIView.as_view(), name='sequences'),
    path('variants/<int:pk>/', views.CreateVariantAPIView.as_view(), name='variants'),
    path('delete_variant/<int:pk>/', views.deleteVariantAPIView, name='delete variant'),
    path('update_waiting_time/<int:pk>/', views.updateWaitingTime, name='update waiting time'),
    path('add_sender_to_campaign/<int:pk>/', views.addSenderToCampaign, name='add sender to campaign'),
    path('template/', views.CreateTemplateAPIView.as_view(), name='template'),
    path('test_template/', views.send_test_emails, name='test template'),
    path('update_template/<int:pk>/', views.RetrieveUpdateDestroyTemplateAPIView.as_view(), name='update template'),
    path('leads_who_replied/', views.RetrieveLeadsWhoRepliedAPIView, name='leads who replied'),
    path('retrieve_replies/<int:pk>/', views.RetrieveReplies, name='retrieve replies'),
    path('send_mail_to_reply/<int:pk>/', views.send_mail_to_reply, name='send mail to reply'),
    path('add_open/<int:lead>/<int:variant>/', views.image_load, name='load image'),
    path('unsubscribe/<int:pk>/', views.unsubscribe_lead, name='unsubscribe_lead'),
    path('analytics/', views.count_analytics, name='count analytics'),
    path('full_report/', views.RetrieveAllAnalytics, name='full report')
]
