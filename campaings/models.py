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
    track_openings = models.BooleanField(blank=True, default=False)
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)
    allowed_days = models.JSONField(blank=True, null=True, default='null')
    email_per_sender = models.IntegerField(blank=True, null=True)
    today = models.DateField(blank=True, null=True)
    sended_today = models.IntegerField(blank=True, default=0)

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
    sended_by = models.ForeignKey(GenericSender, on_delete=models.CASCADE, related_name='leads', blank=True, null=True)
    email_ids = models.JSONField(blank=True, default=[])
    already_sended = models.BooleanField(blank=True, default=False)

    def __str__(self):
        return self.email

class Sequence(models.Model):
    name = models.CharField(max_length=244)
    campaign = models.ForeignKey(Campaign, on_delete=models.CASCADE, related_name='sequences', null=True)
    waiting_time = models.IntegerField(blank=True, null=True);
    current = models.BooleanField(blank=True, default=False)

    def __str__(self):
        return self.name

class Template(models.Model):
    name = models.CharField(max_length=124)
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='templates')
    subject = models.TextField()
    content = models.TextField()

    def __str__(self):
        return self.name


class Variant(models.Model):
    name = models.CharField(max_length=1)
    sequence = models.ForeignKey(Sequence, on_delete=models.CASCADE, related_name='variants')
    template = models.ForeignKey(Template, on_delete=models.SET_NULL, related_name='templates', blank=True, null=True)

    def __str__(self):
        return self.name