from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class PatientCreate(BaseModel):
    name: str
    phone: str
    email: Optional[str] = ""
    dob: Optional[str] = ""
    gender: Optional[str] = ""
    blood_group: Optional[str] = ""
    medical_history: Optional[str] = ""   # ← added
    allergies: Optional[str] = ""         # ← added
    clinic_id: Optional[str] = None       # ← added

class AppointmentCreate(BaseModel):
    patient_id: str                        # ← int → str
    doctor_id: str                         # ← int → str
    appointment_date: str
    start_time: str
    duration_minutes: int = 30
    status: Optional[str] = "Scheduled"   # ← added
    chief_complaint: Optional[str] = ""
    clinic_id: Optional[str] = None       # ← added

class PrescriptionCreate(BaseModel):
    appointment_id: str                    # ← int → str
    medication_name: str
    dosage: str
    duration: str
    instructions: Optional[str] = ""

class VitalSignCreate(BaseModel):
    patient_id: str                        # ← int → str
    weight: Optional[str] = None
    height: Optional[str] = None
    bp_systolic: Optional[int] = None
    bp_diastolic: Optional[int] = None
    pulse: Optional[int] = None
    temperature: Optional[str] = None

class BillCreate(BaseModel):
    appointment_id: str                    # ← int → str
    amount: float                          # ← int → float

class ReceptionistSignup(BaseModel):
    name: str
    email: str
    password: str
    clinic_name: str
    phone: Optional[str] = None
    designation: Optional[str] = None

class DoctorSignup(BaseModel):
    name: str
    email: str
    password: str
    clinic_name: str
    specialization: Optional[str] = None
    license_no: Optional[str] = None
    phone: Optional[str] = None