from django import forms
from django.forms import ModelForm

from .models import User, Album


class Login(forms.Form):
    username = forms.CharField(
        max_length=64, label='', widget=forms.TextInput(attrs={
            'placeholder': 'Nazwa uzytkownika',
            'id': 'username',
            'autofocus': True,
            'autocomplete': 'off',
        })
        )
    password = forms.CharField(
        label='', widget=forms.PasswordInput(attrs={
            'placeholder': 'Haslo',
            'id': 'password',
        }) 
        )

class AlbumForm(ModelForm):
    event_date = forms.DateField(
        widget=forms.DateInput(
            format="date",
            attrs={
                'placeholder': 'rrrr-mm-dd'
            }
        )
    )
    description = forms.CharField(
        required=False,
        widget=forms.Textarea(attrs={'placeholder': 'Opcjonalne'})
    )
    participants = forms.ModelMultipleChoiceField(
        label='',
        queryset=User.objects.all(),
        widget=forms.CheckboxSelectMultiple,
        )
    contributors = forms.ModelMultipleChoiceField(
        label='Edytujacy',
        queryset=User.objects.all(),
        widget=forms.CheckboxSelectMultiple,
    )
    class Meta:
        model = Album
        fields = [
            'title', 'event_date', 'description', 'participants', 'contributors'
        ]
