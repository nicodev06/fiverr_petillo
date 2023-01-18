from django.db import models
from core.models import Workspace

class Campaign(models.Model):
    name = models.CharField(max_length=248)
    created_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=6, blank=True, default='draft')
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='campaigns', default=1)
    leads_fields = models.JSONField(blank=True, null=True, default='null')

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