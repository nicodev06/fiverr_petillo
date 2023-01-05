import imaplib

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics

from django.http import Http404

from django.contrib.auth.models import AnonymousUser
from .serializers import UserSerializer, WorkspaceSerializer, GmailSenderSerializer

from core.models import GmailSender, Workspace

class getCurrentUser(APIView):

    def get(self, request, format=None):
        if isinstance(request.user, AnonymousUser):
            return Response({"user": 0}, stauts=status.HTTP_404_NOT_FOUND)
        else:
            return Response(UserSerializer(request.user).data, status=status.HTTP_200_OK)


class ListCreateWorkspaceAPIView(generics.ListCreateAPIView):
    
    queryset = Workspace.objects.all()
    serializer_class = WorkspaceSerializer

    def get_queryset(self):
        return Workspace.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class toggleWorkspaceAPIView(APIView):

    def get_object(self, pk):
        try:
            return Workspace.objects.get(pk=pk)
        except Workspace.DoesNotExist:
            raise Http404
    
    def put(self, request, pk, format=None):
        Workspace.objects.filter(is_active=True).update(is_active=False)
        workspace = self.get_object(pk)
        serializer = WorkspaceSerializer(workspace, request.data)
        if serializer.is_valid():
            serializer.save()
            workspaces_serializer = WorkspaceSerializer(Workspace.objects.all(), many=True)
            return Response(workspaces_serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class CreateGmailSenderAPIView(APIView):

    def get(self, request, format=None):
        workspace = Workspace.objects.get(user=request.user, is_active=True)
        email_senders = GmailSender.objects.filter(workspace=workspace)
        serializer = GmailSenderSerializer(email_senders, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, format=None):
        # Connection to gmail server
        try:
            mail = imaplib.IMAP4_SSL("imap.gmail.com")
            mail.login(request.data["email"], request.data["password"])
        except imaplib.IMAP4.error as error:
            return Response({"error": error.__str__()}, status=status.HTTP_400_BAD_REQUEST)
        serializer = GmailSenderSerializer(data=request.data)
        if serializer.is_valid():
            workspace = Workspace.objects.get(user=request.user, is_active=True)
            serializer.save(workspace=workspace)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)