from django.db import models

class WaitlistEntry(models.Model):
    email = models.EmailField(unique=True)
    updated = models.DateTimeField(auto_now=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.email   