# Generated by Django 4.1.4 on 2023-01-12 15:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0011_genericsender_active'),
        ('campaings', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='campaing',
            name='workspace',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='campaings', to='core.workspace'),
        ),
    ]