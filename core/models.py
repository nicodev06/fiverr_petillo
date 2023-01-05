from django.db import models
from django.contrib.auth.models import User

class Workspace(models.Model):

    name = models.CharField(max_length=248)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workspaces")
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name

class GmailSender(models.Model):

    first_name = models.CharField(max_length=248, null=True, blank=True, default="")
    last_name = models.CharField(max_length=248, null=True, blank=True, default="")
    email = models.EmailField()
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name="emails")
    password = models.CharField(max_length=16)
    daily_campaign = models.IntegerField()
    sending_limits = models.IntegerField()


    def __str__(self):
        return self.email
    