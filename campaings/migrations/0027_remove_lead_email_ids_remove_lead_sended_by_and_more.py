# Generated by Django 4.1.4 on 2023-01-26 15:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0026_variant_total_open_variant_total_replied_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lead',
            name='email_ids',
        ),
        migrations.RemoveField(
            model_name='lead',
            name='sended_by',
        ),
        migrations.AddField(
            model_name='lead',
            name='emails_sent',
            field=models.JSONField(blank=True, default=[]),
        ),
    ]
