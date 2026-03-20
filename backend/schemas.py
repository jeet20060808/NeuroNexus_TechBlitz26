from pydantic import BaseModel
from typing import Optional

class LoginRequest(BaseModel):
    email: str
    password: str

class PatientCreate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: Optional[str] = ""
    dob: Optional[str] = ""
    gender: Optional[str] = ""
    blood_group: Optional[str] = ""
    address: Optional[str] = ""
    emergency_contact: Optional[str] = ""
    medical_history: Optional[str] = ""
    allergies: Optional[str] = ""
    clinic_id: Optional[str] = None

class AppointmentCreate(BaseModel):
    patient_id: str
    doctor_id: str
    appointment_date: str
    start_time: str
    duration_minutes: int = 30
    status: Optional[str] = "REMAINING"
    chief_complaint: Optional[str] = ""
    clinic_id: Optional[str] = None

class AppointmentStatusUpdate(BaseModel):
    status: str

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

class ClinicalNoteCreate(BaseModel):
    appointment_id: str
    doctor_id: str
    chief_complaint: Optional[str] = ""
    examination_findings: Optional[str] = ""
    diagnosis: Optional[str] = ""
    treatment_plan: Optional[str] = ""
    medications: Optional[str] = ""
    follow_up: Optional[str] = ""
    note_text: Optional[str] = ""

class EmailRequest(BaseModel):
    appointment_id: str
    email: str
    patient_name: str
    report_data: dict