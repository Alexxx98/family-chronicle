# Generated by Django 4.2.6 on 2023-11-04 16:48

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chronicle', '0009_album_event_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='images_folder_id',
            field=models.CharField(default=None, max_length=255),
        ),
        migrations.AlterField(
            model_name='album',
            name='event_date',
            field=models.DateField(default=datetime.date(2023, 11, 4)),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=datetime.date(2023, 11, 4)),
        ),
    ]
