from rest_framework import serializers
from django.utils.timezone import now
from campaings.models import Campaign, Lead, Sequence, Variant
from core.api.serializers import BasicGenericSenderSerializer


class CampaignSerializer(serializers.ModelSerializer):

    days_since_creation = serializers.SerializerMethodField()
    senders = BasicGenericSenderSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created_at', 'status', 'workspace', 'days_since_creation', 'senders', 'waiting_time', 'daily_campaign', 'unsubscribe', 'unsubscribe_message', 'leads_fields', 'track_openings', 'start_date', 'end_date', 'allowed_days']
        read_only_fields = ['workspace', 'created_at', 'leads_fields']

    def get_days_since_creation(self, obj):
        return (now().date() - obj.created_at).days

class LeadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Lead
        fields = '__all__'

class CsvUploadSerializer(serializers.Serializer):
    file = serializers.FileField()


class VariantSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Variant
        fields = '__all__'
        read_only_fields = ['sequence', 'name']

class SequenceSerializer(serializers.ModelSerializer):

    variants = VariantSerializer(many=True, read_only=True)

    class Meta:
        model = Sequence
        fields = ['id', 'campaign', 'name', 'variants', 'waiting_time']
        read_only_fields = ['campaign', 'name', 'variants', 'waiting_time']


