from django.urls import path
from .views import getCurrentUser, ListCreateWorkspaceAPIView, toggleWorkspace

urlpatterns = [
    path('current_user/', getCurrentUser.as_view(), name="current user"),
    path('workspaces/', ListCreateWorkspaceAPIView.as_view(), name="workspaces list"),
    path('toggle_workspace/', toggleWorkspace.as_view(), name="toggle workspace")
]
