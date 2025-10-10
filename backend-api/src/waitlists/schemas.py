from ninja import Schema
from datetime import datetime
from pydantic import EmailStr   

class WaitlistEntryCreateSchema(Schema):
    # create -> data
    # WaistListEntryIn
    email: EmailStr

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