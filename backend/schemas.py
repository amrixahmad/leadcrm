from pydantic import BaseModel
from datetime import datetime

class UserBase(BaseModel):
    email: str

class UserCreate(UserBase):
    password: str

    class Config:
        orm_mode = True

class User(UserBase):
    id: int
    email: str
    first_name: str
    last_name: str
    date_created: datetime
    date_updated: datetime

    class Config:
        orm_mode = True

class LeadBase(BaseModel):
    first_name: str
    last_name: str
    email: str
    company: str
    note: str
    
class LeadCreate(LeadBase):
    pass

class Lead(LeadBase):
    id: int
    owner_id: int
    date_created: datetime
    date_updated: datetime

    class Config:
        orm_mode = True

