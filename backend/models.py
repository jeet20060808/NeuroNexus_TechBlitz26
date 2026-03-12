from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime

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
    dob = Column(String, nullable=True) # YYYY-MM-DD
    gender = Column(String, nullable=True)
    address = Column(String, nullable=True)
    blood_group = Column(String)
    medical_history = Column(String, nullable=True)
    allergies = Column(String, nullable=True)

class Doctor(Base):
    __tablename__ = "doctors"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    specialty = Column(String)
    license_number = Column(String, nullable=True)

class Appointment(Base):
    __tablename__ = "appointments"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    doctor_id = Column(Integer, ForeignKey("doctors.id"))
    appointment_date = Column(String) # YYYY-MM-DD
    start_time = Column(String)
    duration_minutes = Column(Integer, default=30)
    status = Column(String, default="Scheduled") # Scheduled, Completed, Cancelled, No-show
    chief_complaint = Column(String, nullable=True)
    diagnosis = Column(String, nullable=True)
    treatment_plan = Column(String, nullable=True)

    patient = relationship("Patient")
    doctor = relationship("Doctor")

class Prescription(Base):
    __tablename__ = "prescriptions"
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    medication_name = Column(String)
    dosage = Column(String)
    duration = Column(String)
    instructions = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

class VitalSign(Base):
    __tablename__ = "vital_signs"
    id = Column(Integer, primary_key=True, index=True)
    patient_id = Column(Integer, ForeignKey("patients.id"))
    date = Column(DateTime, default=datetime.utcnow)
    weight = Column(String, nullable=True) # kg
    height = Column(String, nullable=True) # cm
    bp_systolic = Column(Integer, nullable=True)
    bp_diastolic = Column(Integer, nullable=True)
    pulse = Column(Integer, nullable=True)
    temperature = Column(String, nullable=True) # Celsius

class Bill(Base):
    __tablename__ = "bills"
    id = Column(Integer, primary_key=True, index=True)
    appointment_id = Column(Integer, ForeignKey("appointments.id"))
    amount = Column(Integer)
    status = Column(String, default="Unpaid") # Unpaid, Paid, Partially Paid
    payment_method = Column(String, nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
