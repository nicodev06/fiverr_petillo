# Generated by Django 4.1.4 on 2023-01-18 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0008_lead_bounced_lead_contacted_lead_email_opened_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='subscribe',
            field=models.BooleanField(blank=True, default=True),
        ),
    ]