from sqlalchemy import Column, String, Integer, Float, DateTime, ForeignKey, Text
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime
import uuid


def gen_id():
    return str(uuid.uuid4())


class Clinic(Base):
    __tablename__ = "clinics"

    id         = Column(String(100), primary_key=True, default=gen_id)
    name       = Column(String(200), unique=True, nullable=False)
    clinic_key = Column(String(200), unique=True, nullable=False)
    status     = Column(String(50), default="open")
    created_at = Column(DateTime, default=datetime.utcnow)

    users        = relationship("User", back_populates="clinic")
    appointments = relationship("Appointment", back_populates="clinic")


class User(Base):
    __tablename__ = "users"

    id             = Column(String(100), primary_key=True, default=gen_id)
    name           = Column(String(200), nullable=False)
    email          = Column(String(200), unique=True, nullable=False)
    password_hash  = Column(String(255), nullable=False)
    role           = Column(String(50), nullable=False)          # "receptionist" | "doctor"
    clinic_id      = Column(String(100), ForeignKey("clinics.id"), nullable=False)
    specialization = Column(String(100))
    license_no     = Column(String(100))
    phone          = Column(String(20))
    designation    = Column(String(100))
    status         = Column(String(50), default="available")
    created_at     = Column(DateTime, default=datetime.utcnow)

    clinic       = relationship("Clinic", back_populates="users")
    appointments = relationship("Appointment", back_populates="doctor")


class Patient(Base):
    __tablename__ = "patients"

    id              = Column(String(100), primary_key=True, default=gen_id)
    clinic_id       = Column(String(100), ForeignKey("clinics.id"), nullable=True)
    name            = Column(String(200), nullable=False)
    phone           = Column(String(20))
    email           = Column(String(200))
    dob             = Column(String(20))          # "YYYY-MM-DD"
    gender          = Column(String(20))
    blood_group     = Column(String(10))
    medical_history = Column(Text)
    allergies       = Column(Text)
    created_at      = Column(DateTime, default=datetime.utcnow)

    appointments = relationship("Appointment", back_populates="patient")
    vitals       = relationship("VitalSign", back_populates="patient")


class Appointment(Base):
    __tablename__ = "appointments"

    id               = Column(String(100), primary_key=True, default=gen_id)
    clinic_id        = Column(String(100), ForeignKey("clinics.id"), nullable=True)
    patient_id       = Column(String(100), ForeignKey("patients.id"), nullable=False)
    doctor_id        = Column(String(100), ForeignKey("users.id"), nullable=False)
    appointment_date = Column(String(50))         # "YYYY-MM-DD"
    start_time       = Column(String(20))         # "HH:MM"
    duration_minutes = Column(Integer, default=30)
    status           = Column(String(50), default="Scheduled")
    chief_complaint  = Column(Text)
    urgency          = Column(String(50), default="normal")
    created_at       = Column(DateTime, default=datetime.utcnow)

    clinic  = relationship("Clinic", back_populates="appointments")
    patient = relationship("Patient", back_populates="appointments")
    doctor  = relationship("User", back_populates="appointments")

    prescriptions = relationship("Prescription", back_populates="appointment")
    bill          = relationship("Bill", back_populates="appointment", uselist=False)


class VitalSign(Base):
    __tablename__ = "vital_signs"

    id           = Column(String(100), primary_key=True, default=gen_id)
    patient_id   = Column(String(100), ForeignKey("patients.id"), nullable=False)
    weight       = Column(String(20))       # kg, stored as string for flexibility
    height       = Column(String(20))       # cm
    bp_systolic  = Column(Integer)
    bp_diastolic = Column(Integer)
    pulse        = Column(Integer)
    temperature  = Column(String(20))       # °C
    date         = Column(DateTime, default=datetime.utcnow)

    patient = relationship("Patient", back_populates="vitals")


class Prescription(Base):
    __tablename__ = "prescriptions"

    id               = Column(String(100), primary_key=True, default=gen_id)
    appointment_id   = Column(String(100), ForeignKey("appointments.id"), nullable=False)
    medication_name  = Column(String(200), nullable=False)
    dosage           = Column(String(100))
    duration         = Column(String(100))
    instructions     = Column(Text)
    created_at       = Column(DateTime, default=datetime.utcnow)

    appointment = relationship("Appointment", back_populates="prescriptions")


class Bill(Base):
    __tablename__ = "bills"

    id             = Column(String(100), primary_key=True, default=gen_id)
    appointment_id = Column(String(100), ForeignKey("appointments.id"), nullable=False)
    amount         = Column(Float, nullable=False)
    status         = Column(String(50), default="Unpaid")   # "Unpaid" | "Paid"
    created_at     = Column(DateTime, default=datetime.utcnow)

    appointment = relationship("Appointment", back_populates="bill")