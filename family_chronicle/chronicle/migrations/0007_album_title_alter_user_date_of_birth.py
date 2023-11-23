# Generated by Django 4.2.6 on 2023-11-01 11:35

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chronicle', '0006_album_user_date_of_birth_user_family_delete_post_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='album',
            name='title',
            field=models.CharField(default=None, max_length=64, unique=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='date_of_birth',
            field=models.DateField(default=datetime.date(2023, 11, 1)),
        ),
    ]
