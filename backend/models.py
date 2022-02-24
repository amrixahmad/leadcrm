import passlib.hash as _hash
from sqlalchemy import Boolean,String,Integer,Column,ForeignKey,DateTime
from sqlalchemy.orm import relationship
from datetime import datetime

from database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer,primary_key=True,index=True)
    email = Column(String,index=True)
    password = Column(String)
    first_name = Column(String,index=True,default="")
    last_name = Column(String,index=True,default="")

    is_active = Column(Boolean,default=True)

    date_created = Column(DateTime,default=datetime.utcnow())
    date_updated = Column(DateTime,default=datetime.utcnow())

    leads = relationship("Lead",back_populates="owner")

    def verify_password(self,password: str):
        return _hash.bcrypt.verify(password,self.password)

class Lead(Base):
    __tablename__ = "leads"
    id = Column(Integer,primary_key=True,index=True)
    owner_id = Column(Integer,ForeignKey("users.id"))

    first_name = Column(String,index=True,default="")
    last_name = Column(String,index=True,default="")
    email = Column(String,index=True)
    company = Column(String,index=True,default="")
    note = Column(String,index=True,default="")
    date_created = Column(DateTime,default=datetime.utcnow())
    date_updated = Column(DateTime,default=datetime.utcnow())

    owner = relationship("User",back_populates="leads")
