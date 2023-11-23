from django.urls import path

from . import views


urlpatterns = [
    path('', views.login_view, name="login"),
    path('logout', views.logout_view, name='logout'),
    path('home', views.home, name="home"),
    path('home/add_album', views.create_album, name="create_album"),
    path('album/<int:album_id>', views.album, name="view_album"),
]
