# Generated by Django 4.1.4 on 2023-01-25 07:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('campaings', '0021_alter_campaign_sended_today_template'),
    ]

    operations = [
        migrations.AddField(
            model_name='variant',
            name='template',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='templates', to='campaings.template'),
        ),
    ]