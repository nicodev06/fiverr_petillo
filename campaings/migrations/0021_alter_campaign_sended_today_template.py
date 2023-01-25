# Generated by Django 4.1.4 on 2023-01-25 07:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0013_genericsender_sended_today_genericsender_today'),
        ('campaings', '0020_lead_already_sended'),
    ]

    operations = [
        migrations.AlterField(
            model_name='campaign',
            name='sended_today',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.CreateModel(
            name='Template',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=124)),
                ('subject', models.TextField()),
                ('content', models.TextField()),
                ('workspace', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='templates', to='core.workspace')),
            ],
        ),
    ]