from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI,Depends,HTTPException
from typing import List
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
import passlib.hash as _hash
import schemas,crud

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/users")
async def create_user(user: schemas.UserCreate,db: Session = Depends(crud.get_db)):
    db_user = await crud.get_user_by_email(user.email,db)
    if db_user:
        raise HTTPException(status_code=401,detail="Someone else has already registered using that email")
    
    user = await crud.create_user(user,db)
    return await crud.create_token(user)

@app.post("/api/token")
async def generate_token(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(crud.get_db)
    ):
    
    user = await crud.authenticate_user(form_data.username,form_data.password,db)

    if not user:
        raise HTTPException(status_code=401,detail="Invalid credentials")
    
    return await crud.create_token(user)

@app.get("/api/users/me",response_model=schemas.User)
async def get_user(user: schemas.User = Depends(crud.get_current_user)):
    return user

@app.post("/api/leads",response_model=schemas.LeadCreate)
async def create_lead(
    lead: schemas.LeadCreate,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db)
    ):
    return await crud.create_lead(lead,user,db)

@app.get("/api/leads",response_model=List[schemas.Lead]) 
async def get_leads(
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db)
    ):
    return await crud.get_leads(user,db)

@app.get("/api/leads/{lead_id}",status_code=200)
async def get_leads(
    lead_id: int,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db)
    ):
    return await crud.get_lead(lead_id,user,db)

@app.delete("/api/leads/{lead_id}",status_code=204)
async def delete_lead(
    lead_id: int,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db)
    ):
    await crud.delete_lead(lead_id,user,db)
    return {"message":"Lead has been deleted successfully"}

@app.put("/api/leads/{lead_id}",status_code=200)
async def update_lead(
    lead_id: int,
    lead: schemas.LeadCreate,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db)
    ):
    await crud.update_lead(lead_id,lead,user,db)
    return {"message": "Lead has been updated successfully"}

@app.get("/api")
async def root():
    return {"message": "Best lead management system in the whole wide world"}


