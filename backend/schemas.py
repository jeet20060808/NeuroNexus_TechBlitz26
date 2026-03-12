from pydantic import BaseModel
from typing import List, Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class PatientCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    dob: Optional[str] = ""
    gender: Optional[str] = ""
    address: Optional[str] = ""
    blood_group: Optional[str] = ""

class AppointmentCreate(BaseModel):
    patient_id: int
    doctor_id: int
    appointment_date: str
    start_time: str
    duration_minutes: int = 30
    chief_complaint: Optional[str] = ""

class PrescriptionCreate(BaseModel):
    appointment_id: int
    medication_name: str
    dosage: str
    duration: str
    instructions: Optional[str] = ""

class VitalSignCreate(BaseModel):
    patient_id: int
    weight: Optional[str] = None
    height: Optional[str] = None
    bp_systolic: Optional[int] = None
    bp_diastolic: Optional[int] = None
    pulse: Optional[int] = None
    temperature: Optional[str] = None

class BillCreate(BaseModel):
    appointment_id: int
    amount: int
