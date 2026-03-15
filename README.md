# 🏥 Healio - Smart Clinic Management System

Healio is a premium, high-performance Clinic Management System designed for the modern healthcare era. Built with a sleek, interactive frontend and a robust FastAPI backend, Healio streamlines administrative tasks, patient management, and doctor workflows with a focus on visual excellence and user experience.

## ✨ Why Healio?

- **💎 State-of-the-Art UI/UX**: Experience a premium interface with glassmorphism, smooth micro-animations, and a dynamic "vibe" that feels alive.
- **🔐 Intelligent Access Control**: Role-based portals for Doctors, Receptionists, and Administrators, ensuring data security and functional clarity.
- **📅 Advanced Patient Lifecycle**: From one-click registration to real-time queue management and comprehensive clinical records.
- **🩺 Physician-Centric Workflow**: A dedicated Doctor's Dashboard for managing today's patients, vitals tracking, and prescription management.
- **🚀 Built for Speed**: Lightning-fast performance powered by React 19 (Vite) and asynchronous FastAPI operations.

## 🛠️ Technology Stack

### Frontend
- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + Custom CSS
- **Icons**: [Lucide React](https://lucide.dev/)
- **Interactions**: Custom Smooth Transitions & Hover Effects

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.10+)
- **Database**: [SQLite](https://www.sqlite.org/) with [SQLAlchemy ORM](https://www.sqlalchemy.org/)
- **Schema Validation**: [Pydantic](https://docs.pydantic.dev/)
- **Development Tooling**: `view_data.py` for direct DB inspection

## 📁 Project Structure

```bash
clinic-management-system/
├── my-react-app/          # React Frontend (Vite)
│   ├── src/
│   │   ├── doctor/        # Doctor specialized views & dashboards
│   │   ├── receptionist/  # Receptionist specialized views & queue management
│   │   ├── pages/         # High-level pages (Login, Landing)
│   │   └── App.jsx        # Main routing logic
│   └── public/assets/     # Premium visual assets
└── backend/               # FastAPI Backend
    ├── main.py            # API Routes & Entry Point
    ├── models.py          # SQLAlchemy Database Models
    ├── schemas.py         # Pydantic Schemas
    └── database.py        # DB Engine & Session Setup
```

## 🚀 Getting Started

### 1. Backend Setup
1. Open a terminal in the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Launch the server:
   ```bash
   python main.py
   ```
   *The server runs on `http://localhost:3001` and initializes `clinic.db` automatically.*

### 2. Frontend Setup
1. Open a terminal in the `my-react-app` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   *Visit the app at the URL provided in the terminal (usually `http://localhost:5173`).*

## 💡 Accessing the Demo

Select your role on the login screen:
- **Receptionist**: Access patient registration, appointments, and general clinic oversight.
- **Doctor**: View your daily schedule, check patient vitals, and manage clinical notes.

**Default Credentials:**
- **Email**: `admin@healio.com` (or any seeded user)
- **Password**: `admin123`

---
✨ Built with ❤️ for **NeuroNexus TechBlitz 2026** by [Jeet Gawad](https://github.com/jeet20060808).
