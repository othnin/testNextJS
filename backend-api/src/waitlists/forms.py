from django.utils import timezone
from django import forms
from .models import WaitlistEntry
from django.contrib import admin

class WaitlistCreateForm(forms.ModelForm):
    class Meta:
        model = WaitlistEntry
        fields = ['email']

    def clean_email(self):
        email = self.cleaned_data.get('email')
        #today = timezone.now().day()
        qs = WaitlistEntry.objects.filter(email=email)
        if qs.exists():
            raise forms.ValidationError("This email is already on the waitlist.")


class WaitlistEntryAdmin(admin.ModelAdmin):
    form = WaitlistCreateForm
    list_display = ['email', 'updated', 'timestamp']
    search_fields = ['email']
    class Meta:
        model = WaitlistEntry

