# Generated by Django 4.1.4 on 2023-01-08 13:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_genericsender_spf'),
    ]

    operations = [
        migrations.AddField(
            model_name='genericsender',
            name='dkim',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AddField(
            model_name='genericsender',
            name='dmarc',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
    ]
