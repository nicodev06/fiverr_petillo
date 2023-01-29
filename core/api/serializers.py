from rest_framework import serializers
from core.models import GenericSender, Workspace
from django.contrib.auth.models import User

class BasicGenericSenderSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    email = serializers.EmailField()

class UserSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    username = serializers.CharField(read_only=True)
    email = serializers.EmailField()
    first_name = serializers.CharField()
    last_name = serializers.CharField()

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class WorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = ["id", "name", "user", "is_active", "team", "webhooks"]
        read_only_fields = ["user"]


class GenericSenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = GenericSender
        fields = "__all__"
        read_only_fields = ["workspace", "spf", "dkim", "dmarc"]

