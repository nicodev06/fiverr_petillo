import imaplib
import smtplib
from math import ceil

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.decorators import api_view

from django.http import Http404

from django.contrib.auth.models import AnonymousUser
from .serializers import UserSerializer, WorkspaceSerializer, GenericSenderSerializer, BasicGenericSenderSerializer

from core.models import GenericSender, Workspace, User

from .utils import verification, EmailPagination

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

    def post(self, request, format=None):
        # Connection to gmail server
        try:
            mail = imaplib.IMAP4_SSL("imap.gmail.com")
            mail.login(request.data["email"], request.data["imap_password"])
        except imaplib.IMAP4.error as error:
            return Response({"error": error.__str__()}, status=status.HTTP_400_BAD_REQUEST)
        serializer = GenericSenderSerializer(data=request.data)
        if serializer.is_valid():
            workspace = Workspace.objects.get(user=request.user, is_active=True)
            #verification_report = verification("gmail.com", serializer.validated_data["email"], "smtp.gmail.com", "imap.gmail.com", serializer.validated_data["smtp_password"], serializer.validated_data["imap_password"])
            serializer.save(workspace=workspace, spf=True, dmarc=True, dkim=False, active=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def imapAuthenticationAPIView(request):
    try:
        mail = imaplib.IMAP4_SSL(request.data["host"])
        mail.login(request.data["email"], request.data["password"])
        return Response({"message": "Correctly authenticated to IMAP host"}, status=status.HTTP_200_OK)
    except imaplib.IMAP4.error:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
def smtpAuthenticationAPIView(request):
    try:
        smtp_server = smtplib.SMTP(request.data["host"], request.data["port"])
        smtp_server.starttls()
        smtp_server.login(request.data["email"], request.data["password"])
        return Response({"message": "Correctly authenticated"}, status=status.HTTP_200_OK)
    except smtplib.SMTPAuthenticationError:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def email_pages_count(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    senders_count = GenericSender.objects.filter(workspace=workspace).count()
    page_count = ceil(senders_count / 4)
    return Response({"pages": page_count}, status=status.HTTP_200_OK)

@api_view(["GET"])
def email_senders_count(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    senders_count = GenericSender.objects.filter(workspace=workspace).count()
    return Response({"senders": senders_count}, status=status.HTTP_200_OK)

class CreateGenericSenderAPIView(generics.ListCreateAPIView):

    queryset = GenericSender.objects.all()
    serializer_class = GenericSenderSerializer
    pagination_class = EmailPagination

    def perform_create(self, serializer):
        current_workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        domain = serializer.validated_data["email"].split("@")[1]
        #verification_report = verification(domain, serializer.validated_data["email"], serializer.validated_data["smtp_host"], serializer.validated_data["imap_host"], serializer.validated_data["smtp_password"], serializer.validated_data["imap_password"])
        serializer.save(workspace=current_workspace, spf=True, dmarc=False, dkim=True, active=True)
    
    def get_queryset(self):
        workspace = Workspace.objects.get(is_active=True);
        return GenericSender.objects.filter(workspace=workspace).order_by("-id");
    

class UpdateDestroyGenericSenderAPIView(generics.RetrieveUpdateDestroyAPIView):

    queryset = GenericSender.objects.all()
    serializer_class = GenericSenderSerializer

class SearchGenericSenderAPIView(generics.ListAPIView):

    queryset = GenericSender.objects.all()
    serializer_class = GenericSenderSerializer
    pagination_class = EmailPagination

    def get_queryset(self):
        return GenericSender.objects.filter(email__icontains=self.request.query_params.get('q')).order_by('-id')


class BasicGenericSenderListAPIView(generics.ListAPIView):
    queryset = GenericSender.objects.all()
    serializer_class = BasicGenericSenderSerializer

    def get_queryset(self):
        workspace = Workspace.objects.get(user=self.request.user, is_active=True)
        return GenericSender.objects.filter(workspace=workspace).order_by('-id') 

class UpdateCurrentUserAPIView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all() 
    serializer_class = UserSerializer

@api_view(['PUT'])
def update_black_list(request):
    try:
        workspace = Workspace.objects.get(user=request.user, is_active=True)
        workspace.blacklist += request.data['blacklist']
        workspace.save()
        return Response(status=status.HTTP_200_OK)
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def update_team(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    workspace.team.append(request.data['member'])
    workspace.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def retrieve_team_members(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    return Response(workspace.team, status=status.HTTP_200_OK)

@api_view(['PUT'])
def delete_member(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    workspace.team = request.data
    workspace.save()
    return Response(status=status.HTTP_200_OK)


@api_view(['PUT'])
def update_webhooks(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    workspace.webhooks.append(request.data['webhook'])
    workspace.save()
    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def retrieve_webhooks(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    return Response(workspace.webhooks, status=status.HTTP_200_OK)

@api_view(['PUT'])
def delete_webhook(request):
    workspace = Workspace.objects.get(user=request.user, is_active=True)
    workspace.webhooks = request.data
    workspace.save()
    return Response(status=status.HTTP_200_OK)