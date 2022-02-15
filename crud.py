import jwt
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends,HTTPException
from database import engine,SessionLocal,Base
import models,schemas
import passlib.hash as _hash
from datetime import datetime

oauth2schema = OAuth2PasswordBearer(tokenUrl="/api/token")

JWT_SECRET = "amriahmadjwtsecret"

def create_db():
    return Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_user_by_email(email: str,db: Session):
    return db.query(models.User).filter(models.User.email == email).first()

async def create_user(user: schemas.UserCreate,db: Session):
    new_user = models.User(
        email=user.email,
        password=_hash.bcrypt.hash(user.password)
        )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

async def authenticate_user(email: str, password:str, db: Session):
    user = await get_user_by_email(email,db)

    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user

async def create_token(user: models.User):
    user_obj = schemas.User.from_orm(user)
    user_dict = user_obj.dict()
    # print(user_dict)
    # print(user_dict["date_updated"])
    del user_dict["date_created"]
    del user_dict["date_updated"]
    token = jwt.encode(user_dict,JWT_SECRET)

    return dict(access_token=token,token_type="bearer")

async def get_current_user(db: Session = Depends(get_db),token: str = Depends(oauth2schema)):
    try:
        payload = jwt.decode(token,JWT_SECRET,algorithms=["HS256"])
        user = db.query(models.User).get(payload["id"])
    except:
        raise HTTPException(status_code=401,detail="Invalid email or password")
    
    return schemas.User.from_orm(user)

async def create_lead(lead: schemas.LeadCreate,user: schemas.User,db: Session):
    lead = models.Lead(**lead.dict(),owner_id=user.id)
    db.add(lead)
    db.commit()
    db.refresh(lead)
    return schemas.Lead.from_orm(lead)

async def get_leads(user: schemas.User,db: Session):
    leads = db.query(models.Lead).filter_by(owner_id=user.id)
    return list(map(schemas.Lead.from_orm,leads))

async def _lead_selector(lead_id: int,user: schemas.User,db: Session):
    lead = (
        db.query(models.Lead)
        .filter_by(owner_id=user.id)
        .filter(models.Lead.id == lead_id)
        .first()
        )
    if lead is None:
        raise HTTPException(status_code=404,detail="Lead does not exist")
    
    return lead

async def get_lead(lead_id: int,user: schemas.User,db: Session):
    lead = await _lead_selector(lead_id,user,db)

    return schemas.Lead.from_orm(lead)

async def delete_lead(lead_id: int,user: schemas.User,db:Session):
    lead = (
            db.query(models.Lead)
            .filter_by(owner_id=user.id)
            .filter(models.Lead.id == lead_id)
            .first()
            )
    db.delete(lead)
    db.commit()

async def update_lead(
    lead_id: int,
    lead: schemas.LeadCreate,
    user: schemas.User,
    db: Session
    ):
    db_lead = await _lead_selector(lead_id,user,db)

    if not db_lead:
        raise HTTPException(status_code=404,detail="The lead doesn't exist")

    db_lead.first_name = lead.first_name
    db_lead.last_name = lead.last_name
    db_lead.email = lead.email
    db_lead.company = lead.company
    db_lead.note = lead.note
    db_lead.date_updated = datetime.utcnow()

    db.commit()
    db.refresh(db_lead)

    return schemas.Lead.from_orm(db_lead)


