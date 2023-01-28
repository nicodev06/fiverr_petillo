from rest_framework import serializers
from django.utils.timezone import now
from campaings.models import Campaign, Lead, Sequence, Variant, Template
from core.api.serializers import BasicGenericSenderSerializer
from ..tasks import update_replies_count


class CampaignSerializer(serializers.ModelSerializer):

    days_since_creation = serializers.SerializerMethodField()
    total_replies = serializers.SerializerMethodField()
    total_opens = serializers.SerializerMethodField()
    total_sent = serializers.SerializerMethodField()
    senders = BasicGenericSenderSerializer(many=True, read_only=True)

    class Meta:
        model = Campaign
        fields = ['id', 'name', 'created_at', 'status', 'workspace', 'days_since_creation', 'senders', 'waiting_time', 'daily_campaign', 'unsubscribe', 'unsubscribe_message', 'leads_fields', 'track_openings', 'start_date', 'end_date', 'allowed_days', 'email_per_sender', 'total_replies', 'total_opens', 'total_sent']
        read_only_fields = ['workspace', 'created_at', 'leads_fields', 'email_per_sender']
        

    def get_days_since_creation(self, obj):
        return (now().date() - obj.created_at).days

    def get_total_opens(self, obj):
        total = 0
        for sequence in obj.sequences.all():
            for variant in sequence.variants.all():
                total += variant.total_open
        return total
    
    def get_total_replies(self, obj):
        total = 0
        update_replies_count.delay(obj.id)
        for sequence in obj.sequences.all():
            for variant in sequence.variants.all():
                total += variant.total_replied
        return total
    
    def get_total_sent(self, obj):
        total = 0
        for sequence in obj.sequences.all():
            for variant in sequence.variants.all():
                total += variant.total_sent
        return total

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
    total_replies = serializers.SerializerMethodField()
    total_opens = serializers.SerializerMethodField()
    total_sent = serializers.SerializerMethodField()

    class Meta:
        model = Sequence
        fields = ['id', 'campaign', 'name', 'variants', 'waiting_time', 'total_replies', 'total_sent', 'total_opens']
        read_only_fields = ['campaign', 'name', 'variants', 'waiting_time']
    
    def get_total_replies(self, obj):
        total = 0
        for variant in obj.variants.all():
            total += variant.total_replied
        return total

    def get_total_sent(self, obj):
        total = 0
        for variant in obj.variants.all():
            total += variant.total_sent
        return total
    
    def get_total_opens(self, obj):
        total = 0
        for variant in obj.variants.all():
            total += variant.total_open
        return total


class TemplateSerializer(serializers.ModelSerializer):

    class Meta:
        model = Template
        fields = '__all__'
        read_only_fields = ['workspace', 'total_sent', 'total_replied']