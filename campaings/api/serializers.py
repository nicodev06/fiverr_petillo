from rest_framework import serializers
from django.utils.timezone import now
from campaings.models import Campaign, Lead


class CampaignSerializer(serializers.ModelSerializer):

    days_since_creation = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created_at', 'status', 'workspace', 'days_since_creation']
        read_only_fields = ['workspace', 'created_at']

    def get_days_since_creation(self, obj):
        return (now().date() - obj.created_at).days

class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead
        fields = '__all__'

class CsvUploadSerializer(serializers.Serializer):
    file = serializers.FileField()