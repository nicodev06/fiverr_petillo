# Generated by Django 4.1.4 on 2023-01-19 18:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0011_variant'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='sequence',
            name='campaign',
        ),
        migrations.AddField(
            model_name='sequence',
            name='waiting_time',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
