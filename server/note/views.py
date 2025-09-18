from django.shortcuts import render
from .models import Note
from .serializers import NoteSerializer
from rest_framework import permissions, viewsets
from rest_framework.response import Response


# Create your views here.
class NoteViewSet(viewsets.ModelViewSet):
    serializer_class = NoteSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        return Note.objects.filter(user = self.request.user)

    def create(self, request):
        note = Note.objects.create(
            user = request.user,
            note_title = request.POST.get("note_title"),
            note_content = request.POST.get("note_content")
        )
        return Response({"message": "Note created successfully"})