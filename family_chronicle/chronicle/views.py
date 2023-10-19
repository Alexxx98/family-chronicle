from django.shortcuts import render, redirect
from django.contrib.auth import authenticate
from django.http import HttpResponse

from .forms import Login

# Create your views here.
def login(request):
    if request.method == "POST":
        form = Login(request.POST)
        if form.is_valid():
            data = form.cleaned_data
            username = data['username']
            password = data['password']
            user = authenticate(username=username, password=password)
            if user:
                return redirect('home')
            else:
                return HttpResponse("Niepoprawna nazwa uzytkownika lub haslo.")

    return render(request, "chronicle/login.html", {
        "form": Login(),
    })


def home(request):
    return render(request, "chronicle/home.html")