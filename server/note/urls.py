from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NoteViewSet

app_name = "notes"

router = DefaultRouter()
router.register(r'', NoteViewSet, basename='note')

urlpatterns = [
    path("", include(router.urls), name = "note"),
]