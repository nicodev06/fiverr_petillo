# Generated by Django 4.1.4 on 2023-01-29 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0014_genericsender_total_sent'),
    ]

    operations = [
        migrations.AddField(
            model_name='workspace',
            name='blacklist',
            field=models.JSONField(blank=True, default=[]),
        ),
    ]
