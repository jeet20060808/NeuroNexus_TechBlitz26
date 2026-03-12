# 🏥 ClinicOS Pro - Enterprise Healthcare Platform

A premium, state-of-the-art Clinic Management System built with **React (Vite)** and **FastAPI**. This platform provides a seamless experience for both healthcare providers and administrative staff.

## ✨ Key Features

- **💎 Elite UI/UX**: Professional glassmorphism design with sleek animations, dark mode, and a highly responsive interface.
- **🔐 Secure Authentication**: Role-based access control for Doctors and Receptionists using JWT.
- **📅 Appointment Management**: Real-time scheduling, tracking, and management of patient visits.
- **👥 Patient Directory**: Comprehensive electronic medical records (EMR) with history tracking and allergy alerts.
- **🩺 Doctor Dashboard**: Specialized view for physicians to manage their daily schedules and patient consults.
- **🔔 Notification System**: Integrated smart alerts for status updates and reminders.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 18 (Vite)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **HTTP Client**: Axios
- **State/Hooks**: Custom Hooks for Parallax, Cursor Glow, and Notifications

### Backend
- **Framework**: FastAPI (Python)
- **Database**: SQLite (SQLAlchemy ORM)
- **Authentication**: JWT (python-jose)
- **Data Validation**: Pydantic

## 🚀 Getting Started

### Backend Setup
1. Navigate to the `backend` folder.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the server:
   ```bash
   python main.py
   ```
   *The server will run on `http://localhost:3001` and automatically initialize the `clinic.db` database.*

### Frontend Setup
1. Navigate to the `my-react-app` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## 💡 Demo Credentials

- **Email**: `demo@clinic.com`
- **Password**: `demo1234`
- **Roles**: Try logging in as a **Receptionist** to manage scheduling or as a **Doctor** to view patient records.

---
Built with ❤️ for NeuroNexus TechBlitz 2026.
