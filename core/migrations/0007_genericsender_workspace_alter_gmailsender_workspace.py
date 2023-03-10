# Generated by Django 4.1.4 on 2023-01-06 21:25

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_genericsender_reply_to'),
    ]

    operations = [
        migrations.AddField(
            model_name='genericsender',
            name='workspace',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, related_name='generic_senders', to='core.workspace'),
        ),
        migrations.AlterField(
            model_name='gmailsender',
            name='workspace',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='gmail_senders', to='core.workspace'),
        ),
    ]
