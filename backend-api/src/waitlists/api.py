from django.shortcuts import get_object_or_404  
from typing import List
from ninja import Router
import helpers
from .schemas import WaitlistEntryListSchema, WaitlistEntryDetailSchema, WaitlistEntryCreateSchema
from .models import WaitlistEntry

router = Router()

@router.get("", response=List[WaitlistEntryListSchema], auth=helpers.api_auth_user_required)
def list_waitlist_entries(request):
    qs = WaitlistEntry.objects.filter(user=request.user)
    return qs

@router.post("", response=WaitlistEntryDetailSchema, auth=helpers.api_auth_user_or_annon)
def create_waitlist_entry(request, data: WaitlistEntryCreateSchema):
    obj = WaitlistEntry(**data.dict())
    if request.user.is_authenticated:
        obj.user = request.user
    obj.save()
    return obj

@router.get("{entry_id}/", response=WaitlistEntryDetailSchema, auth=helpers.api_auth_user_required)
def get_waitlist_entry(request, entry_id: int):
    obj = get_object_or_404(WaitlistEntry, id=entry_id, user=request.user)
    return obj        


