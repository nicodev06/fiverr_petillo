from rest_framework import serializers
from django.utils.timezone import now
from campaings.models import Campaign, Lead


class CampaignSerializer(serializers.ModelSerializer):

    days_since_creation = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created_at', 'status', 'workspace', 'days_since_creation', 'leads_fields']
        read_only_fields = ['workspace', 'created_at', 'leads_fields']

    def get_days_since_creation(self, obj):
        return (now().date() - obj.created_at).days

class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead
        fields = '__all__'
        read_only_fields = ['campaign']

class CsvUploadSerializer(serializers.Serializer):
    file = serializers.FileField()