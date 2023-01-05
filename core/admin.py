from django.contrib import admin
from .models import Workspace, GmailSender

admin.site.register(Workspace)
admin.site.register(GmailSender)