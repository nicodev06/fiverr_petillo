from rest_framework import serializers
from core.models import GmailSender, GenericSender, Workspace


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()


class WorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = ["id", "name", "user", "is_active"]
        read_only_fields = ["user"]

class GmailSenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = GmailSender
        fields = ["id", "first_name", "last_name", "email", "password", "workspace", "daily_campaign", "sending_limits"]
        read_only_fields = ["workspace"]

class GenericSenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = GenericSender
        read_only_fields = ["workspace"]