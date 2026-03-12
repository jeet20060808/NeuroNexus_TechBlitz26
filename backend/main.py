from fastapi import FastAPI, Depends, HTTPException, status, Body
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from datetime import datetime
from typing import List, Optional
from jose import jwt
import time

# Internal imports
from database import engine, SessionLocal, get_db, Base
import models
import schemas

# Configuration
SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

# Create Database tables
models.Base.metadata.create_all(bind=engine)

# App Initialization
app = FastAPI(title="ClinicOS API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initial Data Seeding
@app.on_event("startup")
def seed_data():
    db = SessionLocal()
    if db.query(models.User).count() == 0:
        # Create Demo User
        demo_user = models.User(name="Clinic Admin", email="demo@clinic.com", password="demo1234", role="receptionist")
        demo_doctor_user = models.User(name="Dr. Smith", email="doctor@clinic.com", password="demo1234", role="doctor")
        db.add(demo_user)
        db.add(demo_doctor_user)
        
        # Create Doctors
        doc1 = models.Doctor(name="Dr. John Smith", specialty="Cardiology", license_number="LIC12345")
        doc2 = models.Doctor(name="Dr. Sarah Wilson", specialty="Pediatrics", license_number="LIC67890")
        db.add(doc1)
        db.add(doc2)
        
        # Create Patients
        p1 = models.Patient(name="Alice Johnson", phone="555-0101", email="alice@example.com", dob="1990-05-15", gender="Female", blood_group="A+", medical_history="Hypertension", allergies="Latex")
        p2 = models.Patient(name="Bob Miller", phone="555-0202", email="bob@example.com", dob="1985-11-20", gender="Male", blood_group="O-", medical_history="Diabetes", allergies="Penicillin")
        db.add(p1)
        db.add(p2)
        
        db.commit()
        
        # Create Appointments
        apt1 = models.Appointment(patient_id=p1.id, doctor_id=doc1.id, appointment_date=datetime.now().strftime("%Y-%m-%d"), start_time="10:00", duration_minutes=30, status="Scheduled", chief_complaint="Chest pain")
        db.add(apt1)
        db.commit()

        # Create Vital Signs
        v1 = models.VitalSign(patient_id=p1.id, weight="65", height="165", bp_systolic=120, bp_diastolic=80, pulse=72, temperature="36.5")
        db.add(v1)

        # Create Prescription
        pr1 = models.Prescription(appointment_id=apt1.id, medication_name="Aspirin", dosage="81mg", duration="30 days", instructions="Once daily")
        db.add(pr1)

        # Create Bill
        b1 = models.Bill(appointment_id=apt1.id, amount=150, status="Unpaid")
        db.add(b1)

        db.commit()
    db.close()

# Routes
@app.post("/api/auth/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email, models.User.password == req.password).first()
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
    patients = db.query(models.Patient).all()
    return {"patients": patients}

@app.post("/api/patients")
def create_patient(patient: schemas.PatientCreate, db: Session = Depends(get_db)):
    db_patient = models.Patient(**patient.dict())
    db.add(db_patient)
    db.commit()
    db.refresh(db_patient)
    return db_patient

@app.get("/api/doctors")
def get_doctors(db: Session = Depends(get_db)):
    doctors = db.query(models.Doctor).all()
    return {"doctors": doctors}

@app.get("/api/appointments")
def get_appointments(date: Optional[str] = None, db: Session = Depends(get_db)):
    query = db.query(models.Appointment)
    if date:
        query = query.filter(models.Appointment.appointment_date == date)
    
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
def create_appointment(apt: schemas.AppointmentCreate, db: Session = Depends(get_db)):
    db_apt = models.Appointment(**apt.dict())
    db.add(db_apt)
    db.commit()
    db.refresh(db_apt)
    return db_apt

@app.delete("/api/appointments/{id}")
def delete_appointment(id: int, db: Session = Depends(get_db)):
    db_apt = db.query(models.Appointment).filter(models.Appointment.id == id).first()
    if not db_apt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    db.delete(db_apt)
    db.commit()
    return {"message": "Success"}

# Prescription Routes
@app.post("/api/prescriptions")
def create_prescription(presc: schemas.PrescriptionCreate, db: Session = Depends(get_db)):
    db_presc = models.Prescription(**presc.dict())
    db.add(db_presc)
    db.commit()
    db.refresh(db_presc)
    return db_presc

@app.get("/api/prescriptions/{appointment_id}")
def get_prescriptions(appointment_id: int, db: Session = Depends(get_db)):
    prescs = db.query(models.Prescription).filter(models.Prescription.appointment_id == appointment_id).all()
    return {"prescriptions": prescs}

# Vital Signs Routes
@app.post("/api/vitals")
def create_vitals(vitals: schemas.VitalSignCreate, db: Session = Depends(get_db)):
    db_vitals = models.VitalSign(**vitals.dict())
    db.add(db_vitals)
    db.commit()
    db.refresh(db_vitals)
    return db_vitals

@app.get("/api/vitals/{patient_id}")
def get_patient_vitals(patient_id: int, db: Session = Depends(get_db)):
    vitals = db.query(models.VitalSign).filter(models.VitalSign.patient_id == patient_id).order_by(models.VitalSign.date.desc()).all()
    return {"vitals": vitals}

# Billing Routes
@app.post("/api/bills")
def create_bill(bill: schemas.BillCreate, db: Session = Depends(get_db)):
    db_bill = models.Bill(**bill.dict())
    db.add(db_bill)
    db.commit()
    db.refresh(db_bill)
    return db_bill

@app.get("/api/bills/{appointment_id}")
def get_appointment_bill(appointment_id: int, db: Session = Depends(get_db)):
    bill = db.query(models.Bill).filter(models.Bill.appointment_id == appointment_id).first()
    return bill

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3001)
