from django.shortcuts import get_object_or_404  
from typing import List
import json
from ninja import Router
import helpers
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailSchema, WaitlistEntryCreateSchema, ErrorWaitlistEntryCreateSchema
from .models import WaitlistEntry
from .forms import WaitlistCreateForm

router = Router()

@router.get("", response=List[WaitlistEntryListSchema], auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
    qs = WaitlistEntry.objects.filter(user=request.user)
    return qs

@router.post("", response={201: WaitlistEntryDetailSchema
                           , 400: ErrorWaitlistEntryCreateSchema}, auth=helpers.api_auth_user_or_annon)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    form = WaitlistCreateForm(data.dict())
    if not form.is_valid() :
        #cleaned_data = form.cleaned_data
        #obj = WaitlistEntry(cleaned_data)
        form_errors = json.loads(form.errors.as_json())
        return 400, form_errors
    obj = form.save(commit=False)
    if request.user.is_authenticated:
        obj.user = request.user
    obj.save()
    return 201, obj

@router.get("{entry_id}/", response=WaitlistEntryDetailSchema, auth=helpers.api_auth_user_required)
def get_waitlist_entry(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)
    return obj        


