from django.db import models
from core.models import Workspace

class Campaign(models.Model):
    name = models.CharField(max_length=248)
    created_at = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=6, blank=True, default='draft')
    workspace = models.ForeignKey(Workspace, on_delete=models.CASCADE, related_name='campaigns', default=1)

    def __str__(self):
        return self.name