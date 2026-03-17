const BASE = "http://127.0.0.1:3001";

const get  = (url) => fetch(BASE + url).then(r => r.json());
const post = (url, data) => fetch(BASE + url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(r => r.json());

export const api = {
  login:               (data) => post("/api/auth/login", data),
  signupReceptionist:  (data) => post("/auth/signup/receptionist", data),
  signupDoctor:        (data) => post("/auth/signup/doctor", data),
  getPatients:         ()     => get("/api/patients"),
  getDoctors:          ()     => get("/api/doctors"),
  getAppointments:     (date) => get(`/api/appointments${date ? `?date=${date}` : ""}`),
  createPatient:       (data) => post("/api/patients", data),
  createAppointment:   (data) => post("/api/appointments", data),
  getClinicDoctors:    (clinicId) => get(`/clinic/doctors?clinic_id=${clinicId}`),
  getDoctorPatients:   (doctorId) => get(`/api/doctors/patients/${doctorId}`),
};