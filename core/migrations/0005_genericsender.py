# Generated by Django 4.1.4 on 2023-01-06 21:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_gmailsender_first_name_gmailsender_last_name'),
    ]

    operations = [
        migrations.CreateModel(
            name='GenericSender',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_name', models.CharField(blank=True, default='', max_length=248, null=True)),
                ('last_name', models.CharField(blank=True, default='', max_length=248, null=True)),
                ('email', models.EmailField(max_length=254)),
                ('imap_username', models.CharField(max_length=248)),
                ('imap_password', models.CharField(max_length=248)),
                ('imap_host', models.CharField(max_length=248)),
                ('smtp_username', models.CharField(max_length=248)),
                ('smtp_password', models.CharField(max_length=248)),
                ('smtp_host', models.CharField(max_length=248)),
            ],
        ),
    ]
