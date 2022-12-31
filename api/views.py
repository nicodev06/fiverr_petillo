from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from django.contrib.auth.models import AnonymousUser
from .serializers import UserSerializer

from core.models import Workspace
from .serializers import WorkspaceSerializer

class getCurrentUser(APIView):

    def get(self, request):
        if isinstance(request.user, AnonymousUser):
            return Response({"user": 0}, status.HTTP_404_NOT_FOUND)
        else:
            return Response(UserSerializer(request.user).data, status.HTTP_200_OK)


class toggleWorkspace(APIView):

    def put(self, request):
        try:
            workspace = Workspace.objects.get(user=request.user, is_active=True)
            workspace.is_active = False
            workspace.save()
        except:
            pass
        finally:
            serializer = WorkspaceSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()


class ListCreateWorkspaceAPIView(generics.ListCreateAPIView):
    
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer

    def get_queryset(self):
        return Workspace.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    
    