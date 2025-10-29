from ninja import Schema
from datetime import datetime
from pydantic import EmailStr   
from typing import List, Any

class WaitlistEntryCreateSchema(Schema):
    # create -> data
    # WaistListEntryIn
    email: EmailStr

class ErrorWaitlistEntryCreateSchema(Schema):
    #non_field_errors: List[dict] = []
    email: List[Any]

class WaitlistEntryListSchema(Schema):
    # list -> data
    #WaitListEntryOut
    id: int
    email: EmailStr
    
class WaitlistEntryDetailSchema(Schema):
    # get -> data
    #WaitListEntryOut
    id: int
    email: EmailStr
    updated: datetime
    timestamp: datetime