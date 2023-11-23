from django.db import models
from django.contrib.auth.models import User

from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseUpload

from datetime import date
import io
import requests
import json


SERVICE_ACCOUNT_KEY = "service-account-key.json"
SCOPES = ["https://www.googleapis.com/auth/drive"]
MIME_TYPES = {

}

def get_service():
    credentials = service_account.Credentials.from_service_account_file(
        filename=SERVICE_ACCOUNT_KEY, scopes=SCOPES
        )
    service = build('drive', 'v3', credentials=credentials)
    return service

# Create your models here.
class User(User):
    date_of_birth = models.DateField(default=date.today())
    family = models.CharField(max_length=64, blank=True)

    def __str__(self) -> str:
        return self.username
    
class Album(models.Model):
    title = models.CharField(max_length=64, unique=True, default=None)
    creator = models.ForeignKey(User, on_delete=models.CASCADE, related_name="album_creator")
    contributors = models.ManyToManyField(User, related_name="album_contributors")
    description = models.TextField(null=True)
    images_folder_id = models.CharField(max_length=255, default=None, null=True)
    event_date = models.DateField(default=date.today())
    participants = models.ManyToManyField(User, related_name="album_participants")

    def serialize(self):
        return {
            'id': self.id,
            'title': self.title,
            'cretor': self.creator.username,
            'contributors': [f"{contributor.first_name} {contributor.last_name}"\
                              for contributor in self.contributors.all()],
            'images': self.get_images(),
            'description': self.description,
            'event_date': self.event_date,
            'participants': [
                f"{participant.first_name.capitalize()} {participant.last_name.capitalize()}"\
                      for participant in self.participants.all()
                ]
        }

    def upload_images_to_gdrive(self, images):
        try:
            service = get_service()

            # get folders list in response
            response = service.files().list(
                q=f"name='{self.title}' and mimeType='application/vnd.google-apps.folder'",
                spaces='drive',
                fields='files(id, name)'
            ).execute()

            folder = response.get('files', [])

            if folder:
                folder = folder[0]
            else:
                folder_metadata = {
                    'name': self.title,
                    'mimeType': 'application/vnd.google-apps.folder',
                }

                folder = service.files().create(
                    body=folder_metadata,
                    fields='id, name'
                    ).execute()
            
            self.images_folder_id = folder['id']

            # Upload each file
            for i, file in enumerate(images):
                file_metadata = {
                    'name': f'image_{i}',
                    'parents': [self.images_folder_id],
                }

                file_permissions = {
                    'role': 'reader',
                    'type': 'anyone',
                }

                media = MediaIoBaseUpload(
                    io.BytesIO(file.read()), mimetype='image/png', resumable=True
                    )
                
                image = service.files().create(
                    body=file_metadata,
                    media_body=media,
                    fields='id, name'
                ).execute()

                service.permissions().create(
                    fileId=image['id'],
                    body=file_permissions
                ).execute()

            return self.images_folder_id
            
        except HttpError as error:
            print(error)

    def get_images(self):
        try:
            service = get_service()

            new_permissions = {
                'role': 'reader',
                'type': 'anyone',
            }

            service.permissions().create(
                fileId=self.images_folder_id, body=new_permissions
                ).execute()

            response = service.files().list(
                q=f"'{self.images_folder_id}' in parents",
                fields='files(id, name)'
            ).execute()

            files = response.get('files', [])
            
            files_urls = []
            if files:
                for file in files:
                    file_id = file['id']
                    files_urls.append(f"https://drive.google.com/uc?export=view&id={file_id}")
            return files_urls
        
        except HttpError as error:
            print(error)
