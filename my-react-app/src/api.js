const BASE = "http://127.0.0.1:3001";

const get  = (url) => fetch(BASE + url).then(r => r.json());
const post = (url, data) => fetch(BASE + url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(data)
}).then(r => r.json());

const patch = (url, data) => fetch(BASE + url, {
  method: "PATCH",
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
  getNotes:            (appointmentId) => get(`/api/notes/${appointmentId}`),
  createNote:          (data) => post("/api/notes", data),
  updateAppointmentStatus: (id, status) => patch(`/api/appointments/${id}/status`, { status }),
  sendReport:           (data) => post("/api/send-report", data),
};