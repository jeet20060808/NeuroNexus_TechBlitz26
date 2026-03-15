from sqlalchemy.orm import Session
from database import SessionLocal
import models

def view_database():
    db = SessionLocal()
    
    print("\n" + "="*50)
    print(" CLINIC DATABASE SNAPSHOT")
    print("="*50)

    # View Patients
    print("\n PATIENTS:")
    patients = db.query(models.Patient).all()
    if not patients:
        print("   No patients found.")
    for p in patients:
        print(f"   - ID {p.id}: {p.name} ({p.gender}, Blood: {p.blood_group})")
        print(f"     Phone: {p.phone} | History: {p.medical_history}")

    # View Doctors
    print("\n DOCTORS:")
    doctors = db.query(models.Doctor).all()
    for d in doctors:
        print(f"   - ID {d.id}: {d.name} | Specialty: {d.specialty}")

    # View Appointments
    print("\n APPOINTMENTS:")
    apts = db.query(models.Appointment).all()
    for a in apts:
        p_name = db.query(models.Patient).filter(models.Patient.id == a.patient_id).first().name
        d_name = db.query(models.Doctor).filter(models.Doctor.id == a.doctor_id).first().name
        print(f"   - {a.appointment_date} @ {a.start_time}: {p_name} <-> {d_name} [{a.status}]")

    # View Vitals
    print("\n LATEST VITALS:")
    vitals = db.query(models.VitalSign).all()
    for v in vitals:
        p_name = db.query(models.Patient).filter(models.Patient.id == v.patient_id).first().name
        print(f"   - {p_name}: BP {v.bp_systolic}/{v.bp_diastolic}, Pulse {v.pulse}, Temp {v.temperature}C")

    # View Bills
    print("\n BILLING STATUS:")
    bills = db.query(models.Bill).all()
    for b in bills:
        print(f"   - Bill #{b.id}: Amount ${b.amount} | Status: {b.status}")

    print("\n" + "="*50)
    db.close()

if __name__ == "__main__":
    view_database()
