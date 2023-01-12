from rest_framework import serializers
from core.models import GenericSender, Workspace


class UserSerializer(serializers.Serializer):
    username = serializers.CharField()
    email = serializers.EmailField()


class WorkspaceSerializer(serializers.ModelSerializer):

    class Meta:
        model = Workspace
        fields = ["id", "name", "user", "is_active"]
        read_only_fields = ["user"]


class GenericSenderSerializer(serializers.ModelSerializer):

    class Meta:
        model = GenericSender
        fields = "__all__"
        read_only_fields = ["workspace", "spf", "dkim", "dmarc"]