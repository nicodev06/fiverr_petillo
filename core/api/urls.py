from django.urls import path
from .views import (getCurrentUser, 
                    ListCreateWorkspaceAPIView, 
                    toggleWorkspaceAPIView, 
                    CreateGmailSenderAPIView,
                    imapAuthenticationAPIView,
                    smtpAuthenticationAPIView,
                    CreateGenericSenderAPIView,
                    email_pages_count,
                    email_senders_count,
                    UpdateDestroyGenericSenderAPIView,
                    SearchGenericSenderAPIView
                    )

urlpatterns = [
    path('current_user/', getCurrentUser.as_view(), name="current user"),
    path('workspaces/', ListCreateWorkspaceAPIView.as_view(), name="workspaces list"),
    path('toggle_workspace/<int:pk>/', toggleWorkspaceAPIView.as_view(), name="toggle workspace"),
    path('gmail_sender/', CreateGmailSenderAPIView.as_view(), name="create gmail sender"),
    path('imap_auth/', imapAuthenticationAPIView, name="imap authentication"),
    path('smtp_auth/', smtpAuthenticationAPIView, name="smtp authentication"),
    path('generic_sender/', CreateGenericSenderAPIView.as_view(), name="create generic sender"),
    path('email_pages/',email_pages_count , name="email pages count"),
    path('email_senders/', email_senders_count, name="email senders count"),
    path('toggle_sender/<int:pk>/', UpdateDestroyGenericSenderAPIView.as_view(), name="toggle sender"),
    path('sender_search/', SearchGenericSenderAPIView.as_view(), name='search sender')
]
