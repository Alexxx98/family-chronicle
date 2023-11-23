from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.http import JsonResponse

from .forms import Login, AlbumForm
from .models import User, Album, get_service


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

@login_required
def logout_view(request):
    logout(request)
    return redirect('login')

@login_required
def home(request):
    return render(request, "chronicle/home.html", {
        'album_form': AlbumForm(),
        'albums': Album.objects.all(),
    })

@login_required
def create_album(request):
    user_id = request.user.id
    user = User.objects.get(pk=user_id)
    if request.method == 'POST':
        form = AlbumForm(request.POST)

        model = Album(title=form['title'].value(),
                      creator=user,
                      description=form['description'].value(),
                      event_date=form['event_date'].value(),
                    )
        model.save()

        # asign contributors and participants indirectly
        model.contributors.set(form['contributors'].value())
        model.participants.set(form['participants'].value())

        # get list of images from html file input
        images = request.FILES.getlist('images')

        # upload images to google drive
        model.upload_images_to_gdrive(images)
        model.save()

        return redirect('home')
    
@login_required
def album(request, album_id):
    try:
        album = Album.objects.get(pk=album_id)
    except Album.DoesNotExist:
        return JsonResponse({'error': 'Album not found'}, status=404)
    
    if request.method == "GET":
        return JsonResponse(album.serialize())
     