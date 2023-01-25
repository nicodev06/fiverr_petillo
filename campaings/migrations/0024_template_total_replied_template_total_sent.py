# Generated by Django 4.1.4 on 2023-01-25 11:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0023_remove_template_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='template',
            name='total_replied',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AddField(
            model_name='template',
            name='total_sent',
            field=models.IntegerField(blank=True, default=0),
        ),
    ]