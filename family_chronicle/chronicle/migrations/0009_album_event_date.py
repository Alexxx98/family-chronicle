# Generated by Django 4.2.6 on 2023-11-02 16:57

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chronicle', '0008_remove_album_images_alter_user_date_of_birth'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='event_date',
            field=models.DateField(default=datetime.date(2023, 11, 2)),
        ),
    ]
