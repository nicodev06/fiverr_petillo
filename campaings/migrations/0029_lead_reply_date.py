# Generated by Django 4.1.4 on 2023-01-27 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0028_lead_sended_by'),
    ]

    operations = [
        migrations.AddField(
            model_name='lead',
            name='reply_date',
            field=models.CharField(blank=True, max_length=248, null=True),
        ),
    ]
