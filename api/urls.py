from django.urls import path
from .views import (getCurrentUser, 
                    ListCreateWorkspaceAPIView, 
                    toggleWorkspaceAPIView, 
                    CreateGmailSenderAPIView,
                    imapAuthenticationAPIView,
                    smtpAuthenticationAPIView
                    )

urlpatterns = [
    path('current_user/', getCurrentUser.as_view(), name="current user"),
    path('workspaces/', ListCreateWorkspaceAPIView.as_view(), name="workspaces list"),
    path('toggle_workspace/<int:pk>/', toggleWorkspaceAPIView.as_view(), name="toggle workspace"),
    path('gmail_sender/', CreateGmailSenderAPIView.as_view(), name="create gmail sender"),
    path('imap_auth/', imapAuthenticationAPIView, name="imap authentication"),
    path('smtp_auth/', smtpAuthenticationAPIView, name="smtp authentication")
]
