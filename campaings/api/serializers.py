from rest_framework import serializers
from django.utils.timezone import now
from campaings.models import Campaign


class CampaignSerializer(serializers.ModelSerializer):

    days_since_creation = serializers.SerializerMethodField()

    class Meta:
        model = Campaign
        fields = ['name', 'created_at', 'status', 'workspace', 'days_since_creation']
        read_only_fields = ['workspace', 'created_at']

    def get_days_since_creation(self, obj):
        return (now().date() - obj.created_at).days