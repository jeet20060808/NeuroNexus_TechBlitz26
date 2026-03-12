from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String, DateTime, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session, relationship
from pydantic import BaseModel
from datetime import datetime, timedelta
from typing import List, Optional
from jose import jwt
import time

# Configuration
SQLALCHEMY_DATABASE_URL = "sqlite:///./clinic.db"
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Database Setup
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Models
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    role = Column(String) # 'doctor' or 'receptionist'

class Patient(Base):
    __tablename__ = "patients"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    phone = Column(String)
    email = Column(String)
    blood_group = Column(String)
    medical_history = Column(String, nullable=True)
    allergies = Column(String, nullable=True)

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialty = Column(String)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    appointment_date = Column(String) # YYYY-MM-DD
    start_time = Column(String)
    duration_minutes = Column(Integer, default=30)
    status = Column(String, default="Scheduled")

    patient = relationship("Patient")
    doctor = relationship("Doctor")

Base.metadata.create_all(bind=engine)

# Schemas
class LoginRequest(BaseModel):
    email: str
    password: str

class PatientCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    blood_group: Optional[str] = ""

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: str
    start_time: str
    duration_minutes: int = 30

# App Initialization
app = FastAPI(title="ClinicOS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Initial Data Seeding
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(User).count() == 0:
        # Create Demo User
        demo_user = User(name="Clinic Admin", email="demo@clinic.com", password="demo1234", role="receptionist")
        demo_doctor_user = User(name="Dr. Smith", email="doctor@clinic.com", password="demo1234", role="doctor")
        db.add(demo_user)
        db.add(demo_doctor_user)
        
        # Create Doctors
        doc1 = Doctor(name="Dr. John Smith", specialty="Cardiology")
        doc2 = Doctor(name="Dr. Sarah Wilson", specialty="Pediatrics")
        db.add(doc1)
        db.add(doc2)
        
        # Create Patients
        p1 = Patient(name="Alice Johnson", phone="555-0101", email="alice@example.com", blood_group="A+", medical_history="Hypertension", allergies="Latex")
        p2 = Patient(name="Bob Miller", phone="555-0202", email="bob@example.com", blood_group="O-", medical_history="Diabetes", allergies="Penicillin")
        db.add(p1)
        db.add(p2)
        
        db.commit()
        
        # Create Appointments
        apt1 = Appointment(patient_id=p1.id, doctor_id=doc1.id, appointment_date=datetime.now().strftime("%Y-%m-%d"), start_time="10:00", duration_minutes=30, status="Scheduled")
        db.add(apt1)
        db.commit()
    db.close()

# Routes
@app.post("/api/auth/login")
def login(req: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == req.email, User.password == req.password).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    token = jwt.encode({"sub": user.email, "role": user.role, "exp": time.time() + 3600}, SECRET_KEY, algorithm=ALGORITHM)
    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }

@app.get("/api/patients")
def get_patients(db: Session = Depends(get_db)):
    patients = db.query(Patient).all()
    return {"patients": patients}

@app.post("/api/patients")
def create_patient(patient: PatientCreate, db: Session = Depends(get_db)):
    db_patient = Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.get("/api/doctors")
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(Doctor).all()
    return {"doctors": doctors}

@app.get("/api/appointments")
def get_appointments(date: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(Appointment)
    if date:
        query = query.filter(Appointment.appointment_date == date)
    
    appointments = query.all()
    result = []
    for apt in appointments:
        result.append({
            "id": apt.id,
            "patient_id": apt.patient_id,
            "doctor_id": apt.doctor_id,
            "appointment_date": apt.appointment_date,
            "start_time": apt.start_time,
            "duration_minutes": apt.duration_minutes,
            "status": apt.status,
            "patient_name": apt.patient.name,
            "doctor_name": apt.doctor.name,
            "medical_history": apt.patient.medical_history,
            "allergies": apt.patient.allergies,
            "phone": apt.patient.phone
        })
    return {"appointments": result}

@app.post("/api/appointments")
def create_appointment(apt: AppointmentCreate, db: Session = Depends(get_db)):
    db_apt = Appointment(**apt.dict())
    db.add(db_apt)
    db.commit()
    db.refresh(db_apt)
    return db_apt

@app.delete("/api/appointments/{id}")
def delete_appointment(id: int, db: Session = Depends(get_db)):
    db_apt = db.query(Appointment).filter(Appointment.id == id).first()
    if not db_apt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(db_apt)
    db.commit()
    return {"message": "Success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
