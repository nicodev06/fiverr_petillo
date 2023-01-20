from django.db import models
from core.models import Workspace, GenericSender

class Campaign(models.Model):
    name = models.CharField(max_length=248)
    created_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=6, blank=True, default='draft')
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='campaigns', default=1)
    leads_fields = models.JSONField(blank=True, null=True, default='null')
    senders = models.ManyToManyField(GenericSender, related_name='campaigns', blank=True, null=True)
    daily_campaign = models.IntegerField(blank=True, null=True)
    waiting_time = models.IntegerField(blank=True, null=True)
    unsubscribe = models.BooleanField(blank=True, default=False)
    unsubscribe_message = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.name

class Lead(models.Model):
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='leads')
    email = models.EmailField()
    first_name = models.CharField(max_length=248, null=True, blank=True)
    last_name = models.CharField(max_length=248, null=True, blank=True)
    ice_braker = models.CharField(max_length=248, null=True, blank=True)
    personalisation = models.CharField(max_length=248, null=True, blank=True)
    phone_number = models.CharField(max_length=248, null=True, blank=True)
    job_title = models.CharField(max_length=248, null=True, blank=True)
    company = models.CharField(max_length=248, null=True, blank=True)
    custom_fields = models.JSONField(blank=True, null=True)
    contacted = models.BooleanField(blank=True, default=False)
    bounced = models.BooleanField(blank=True, default=False)
    email_opened = models.BooleanField(blank=True, default=False)
    replied = models.BooleanField(blank=True, default=False)
    subscribe = models.BooleanField(blank=True, default=True)

    def __str__(self):
        return self.email

class Sequence(models.Model):
    name = models.CharField(max_length=244)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='sequences', null=True)
    waiting_time = models.IntegerField(blank=True, null=True);

    def __str__(self):
        return self.name

class Variant(models.Model):
    name = models.CharField(max_length=1)
    sequence = models.ForeignKey(Sequence, on_delete=models.CASCADE, related_name='variants')

    def __str__(self):
        return self.name