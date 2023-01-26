# Generated by Django 4.1.4 on 2023-01-26 15:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0025_campaign_completed_alter_sequence_waiting_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='variant',
            name='total_open',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='variant',
            name='total_replied',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='variant',
            name='total_sent',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]
