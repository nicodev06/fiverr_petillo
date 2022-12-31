from django.db import models
from django.contrib.auth.models import User

class Workspace(models.Model):

    name = models.CharField(max_length=248)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="workspaces")
    is_active = models.BooleanField(default=False)

    def __str__(self):
        return self.name