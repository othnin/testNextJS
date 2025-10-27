from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL #'auth.User'

class WaitlistEntry(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, default=None)
    email = models.EmailField(unique=True)
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email   