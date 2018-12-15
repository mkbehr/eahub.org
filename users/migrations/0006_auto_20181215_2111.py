# Generated by Django 2.1.4 on 2018-12-15 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20181214_2023'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='city_or_town',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='profile',
            name='country',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='email',
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]