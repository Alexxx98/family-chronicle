from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import HttpResponse

from .forms import Login

# Create your views here.
def login_view(request):
    if request.method == "POST":
        form = Login(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            username = data['username']
            password = data['password']
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('home')
            else:
                messages.add_message(request, messages.WARNING, "Zla nazwa uzytkownika lub haslo.")

    return render(request, "chronicle/login.html", {
        "form": Login(),
    })

def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def home(request):
    return render(request, "chronicle/home.html")