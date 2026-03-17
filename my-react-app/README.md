# ClinicOS Pro

is a modern, responsive, and robust healthcare clinic management platform built with React and Tailwind CSS. It features a dual-dashboard system offering specialized interfaces for both Receptionists and Doctors, streamlining clinic operations, patient management, and medical record tracking.

## 🚀 Features

### 🌟 Core Architecture

- **Role-Based Workflows:** Distinct, customized dashboards for `receptionist` and `doctor` roles.
- **Premium UI/UX:** Clean, light `#3b82f633` tinted theme engineered with Tailwind CSS and enhanced with Lucide Icons.
- **Offline Resilience:** Auto-detects network status and gracefully alerts users to connectivity losses.
- **Persistent Storage:** Integrated `useLocalStorage` hooks maintain state (like patient records) across browser sessions.

### 💼 Receptionist Dashboard

The Receptionist interface empowers administrative staff to orchestrate the clinic's reception area completely.

- **Overview & Today's Queue:** High-level metrics and a detailed view of patients waiting.
- **Bookings & Scheduling:** Interface for managing appointments, visualizing daily schedules, and identifying doctor availability.
- **Patient Management:** Sections for registering new patients, searching existing records, and reviewing histories.
- **Additional Modules:** Built-in scaffolding for Insurance & Billing, Cancellations, Reminders, On-Call Rosters, Reports, and Settings.

### 🩺 Doctor Dashboard

The Doctor interface is designed to optimize clinical workflows and patient care.

- **My Dashboard & Schedule:** Prioritized queues, active appointment lists, and a glance at recent prescriptions/labs.
- **Patient Care & ICU:** Dedicated modules for tracking Active Cases, Ward Admissions, and Critical/ICU monitoring with visual flags for abnormal vitals.
- **Clinical Documentation:** Hubs for writing clinical notes, issuing prescriptions, reviewing pending diagnostic results, and executing inter-departmental referrals.
- **Medical Records:** Quick access to comprehensive medical histories, immunization tracking, and critical allergy alerts.

## 🛠️ Technology Stack

- **Frontend Framework:** React (Vite template)
- **Styling:** Tailwind CSS
- **Icons:** `lucide-react`
- **State Management:** React Hooks (`useState`, `useEffect`, `useContext`) combined with custom LocalStorage hooks.
- **Routing:** Conditional rendering-based routing implemented within `App.jsx`.

## 📂 Project Structure

```text
my-react-app/src/
├── App.jsx                      # Main application shell, router, and context provider
├── pages/
│   ├── LandingPage.jsx          # Public-facing clinic website page
│   └── LoginPage.jsx            # Role-based authentication interface
├── doctor/                      # Doctor-specific components
│   ├── DoctorDashboard.jsx      # Core doctor layout
│   ├── Sidebar.jsx              # Navigation for doctors
│   ├── TopBar.jsx               # Header for doctors
│   └── sections/                # 14 specialized clinical modules (ICU, Prescriptions, etc.)
└── receptionist/                # Receptionist-specific components
    ├── ReceptionistDashboard.jsx# Core receptionist layout
    └── sections/                # 14 specialized administrative modules (Queue, Billing, etc.)
```

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation & Execution

1. Clone the repository:
   ```bash
   git clone https://github.com/jeet20060808/NeuroNexus_TechBlitz26.git
   ```
2. Navigate to the React app directory:
   ```bash
   cd NeuroNexus_TechBlitz26/my-react-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🔒 Authentication (Demo)

The application currently runs a demo mode on the login page.

- **Email:** `demo@clinic.com`
- **Password:** `demo1234`
- toggle between the Receptionist and Doctor buttons above the form to experience the distinct workflows.
