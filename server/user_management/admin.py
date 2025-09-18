from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import CustomUser

# Register your models here.
class CustomUserAdmin(BaseUserAdmin):
    list_display = ["user_email", "user_name", "is_admin"]
    list_filter = ["is_admin"]
    fieldsets = [
        (None, {"fields": ["user_email", "password"]}),
        ("Personal info", {"fields": ["user_name"]}),
        ("Permissions", {"fields": ["is_admin"]}),
    ]
    add_fieldsets = [
        (
            None,
            {
                "classes": ["wide"],
                "fields": ["user_email", "user_name", "password1", "password2"],
            },
        ),
    ]
    search_fields = ["user_email"]
    ordering = ["user_email"]
    filter_horizontal = []

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.unregister(Group)