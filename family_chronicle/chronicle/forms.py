from django import forms


class Login(forms.Form):
    username = forms.CharField(
        max_length=64, label='', widget=forms.TextInput(attrs={
            'placeholder': 'Nazwa uzytkownika',
            'id': 'username',
            'autofocus': True,
        })
        )
    password = forms.CharField(
        label='', widget=forms.PasswordInput(attrs={
            'placeholder': 'Haslo',
            'id': 'password',
        }) 
        )
