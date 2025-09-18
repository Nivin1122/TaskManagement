from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser

import uuid

# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self, user_email, user_name, password = None):
        if not user_email:
            raise ValueError("Users must have an email address")

        user = self.model(
            user_email = self.normalize_email(user_email),
            user_name = user_name,
        )
        user.set_password(password)
        user.save(using = self._db)
        return user

    def create_superuser(self, user_email, user_name, password = None):
        user = self.create_user(
            user_email = user_email,
            password = password,
            user_name = user_name,
        )


        user.is_admin = True
        user.save(using=self._db)
        return user


class CustomUser(AbstractBaseUser):
    user_id = models.UUIDField(primary_key = True, default = uuid.uuid4, editable = False)
    user_email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True,
    )
    user_name = models.CharField(max_length = 200)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)

    objects = CustomUserManager()

    USERNAME_FIELD = "user_email"
    REQUIRED_FIELDS = ["user_name"]

    def __str__(self):
        return self.user_email

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin