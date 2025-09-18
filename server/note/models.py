from django.db import models
from user_management.models import CustomUser


import uuid

# Create your models here.
class Note(models.Model):
    note_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    user = models.ForeignKey(CustomUser, on_delete = models.CASCADE)
    note_title = models.CharField(max_length = 200)
    note_content = models.TextField()
    last_update = models.DateField(auto_now = True)
    created_on = models.DateField(auto_now_add = True)

    def __str__(self):
        return self.note_title