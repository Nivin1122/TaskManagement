
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path("api/notes/", include("note.urls", namespace = "notes")),
    path("api/user/", include("user_management.urls", namespace = "user_management")),
]