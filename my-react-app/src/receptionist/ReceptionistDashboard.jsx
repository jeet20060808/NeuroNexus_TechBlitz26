import React, { useState, useEffect } from 'react';
import { LogOut } from 'lucide-react';
import {api} from '../api';
import Overview from './sections/Overview';
import TodaysQueue from './sections/TodaysQueue';
import RegisterNew from './sections/RegisterNew';
import SearchPatient from './sections/SearchPatient';
import RecordsHistory from './sections/RecordsHistory';
import BookAppointment from './sections/BookAppointment';
import ViewSchedule from './sections/ViewSchedule';
import Cancellations from './sections/Cancellations';
import Availability from './sections/Availability';
import OnCallRoster from './sections/OnCallRoster';

// ... (Rest of useLocalStorage remains same)
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
};

const ReceptionistDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('Overview');
  const [patients, setPatients] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [registerForm, setRegisterForm] = useState({ 
    firstName: '', 
    lastName: '', 
    phone: '', 
    email: '', 
    dob: '', 
    address: '', 
    bloodGroup: '', 
    doctor: '', 
    time: '',
    emergencyContact: ''
  });

const [doctors, setDoctors] = useState([]);

   // useEffect - load patients & doctors
useEffect(() => {
  api.getPatients()
    .then(data => setPatients(data.patients || []))
    .catch(err => console.error("Failed to load patients:", err));

  const today = new Date().toISOString().split('T')[0];
  api.getAppointments(today)
    .then(data => setAppointments(data.appointments || []))
    .catch(err => console.error("Failed to load appointments:", err));

  if (user?.clinic_id) {
    api.getClinicDoctors(user.clinic_id)
      .then(data => setDoctors(data || []))
      .catch(err => console.error("Failed to load doctors:", err));
  }
}, [user?.clinic_id, currentTab]); // Re-fetch on tab change to get status updates from doctor

// handleAddPatient
const handleAddPatient = async (e) => {
  e.preventDefault();
  if (!registerForm.firstName || !registerForm.lastName) return;

  try {
    const newPatient = await api.createPatient({
      first_name: registerForm.firstName,
      last_name: registerForm.lastName,
      phone: registerForm.phone,
      email: registerForm.email,
      dob: registerForm.dob,
      address: registerForm.address,
      blood_group: registerForm.bloodGroup,
      emergency_contact: registerForm.emergencyContact,
      clinic_id: user?.clinic_id || null
    });

    if (registerForm.doctor && registerForm.time) {
      await api.createAppointment({
        patient_id: newPatient.id,
        doctor_id: registerForm.doctor,
        appointment_date: new Date().toISOString().split('T')[0],
        start_time: registerForm.time,
        status: "REMAINING", // Default status
        clinic_id: user?.clinic_id || null
      });
    }

    setPatients(prev => [...prev, newPatient]);
    setRegisterForm({ 
      firstName: '', lastName: '', phone: '', email: '', dob: '', 
      address: '', bloodGroup: '', doctor: '', time: '', emergencyContact: '' 
    });
    setCurrentTab('Search Patient');
    alert("Patient registered successfully!");
  } catch (err) {
    console.error("Failed to register patient:", err);
    alert("Registration failed. Please try again.");
  }
};
  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const doctorStatus = [];

  const renderSidebarItem = (tabName, dotColor) => (
    <li 
      onClick={() => setCurrentTab(tabName)} 
      className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-3 text-sm transition-colors ${currentTab === tabName ? 'bg-[#7C9070]/10 text-[#1A3C40] font-bold' : 'text-slate-600 hover:bg-[#7C9070]/5 hover:text-[#1A3C40]'}`}
    >
      <div className={`w-2 h-2 rounded-full ${dotColor}`}></div> {tabName}
    </li>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'Overview':
        return <Overview appointments={appointments} doctors={doctors} />;
      case "Today's Queue":
        return <TodaysQueue appointments={appointments} />;
      case 'Register New':
        return <RegisterNew registerForm={registerForm} setRegisterForm={setRegisterForm} handleAddPatient={handleAddPatient} setCurrentTab={setCurrentTab} doctors={doctors} />;
      case 'Search Patient':
        return <SearchPatient patients={patients} handleDeletePatient={handleDeletePatient} />;
      case 'Records & History':
        return <RecordsHistory />;
      case 'Book Appointment':
        return <BookAppointment setCurrentTab={setCurrentTab} doctors={doctors} />;
      case 'View Schedule':
        return <ViewSchedule patients={patients} />;
      case 'Cancellations':
        return <Cancellations />;
      case 'Availability':
        return <Availability doctors={doctors} />;
      case 'On-Call Roster':
        return <OnCallRoster />;
      default:
        return <Overview patients={patients} doctors={doctors} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] text-[#1A3C40] flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white h-screen fixed flex flex-col border-r border-[#7C9070]/20 z-20">
        <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden py-6">
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Dashboard</p>
            <ul>
              {renderSidebarItem('Overview', 'bg-blue-400')}
              {renderSidebarItem("Today's Queue", 'bg-orange-400')}
            </ul>
          </div>
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Patients</p>
            <ul>
              {renderSidebarItem('Register New', 'bg-gray-400')}
              {renderSidebarItem('Search Patient', 'bg-gray-400')}
              {renderSidebarItem('Records & History', 'bg-gray-400')}
            </ul>
          </div>
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Appointments</p>
            <ul>
              {renderSidebarItem('Book Appointment', 'bg-gray-400')}
              {renderSidebarItem('View Schedule', 'bg-gray-400')}
              {renderSidebarItem('Cancellations', 'bg-red-400')}
            </ul>
          </div>
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Doctors</p>
            <ul>
              {renderSidebarItem('Availability', 'bg-gray-400')}
              {renderSidebarItem('On-Call Roster', 'bg-blue-400')}
            </ul>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#7C9070]/20 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-900">Healio — Reception</h1>
            <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded">3 Urgent</span>
            <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded">Clinic Open</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-slate-700">Fri 13 Mar 2026 <span className="text-slate-900 ml-2">{new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span></span>
            <div className="flex items-center gap-3 cursor-pointer hover:opacity-80" onClick={onLogout}>
               <div className="w-8 h-8 bg-blue-100 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
                 {user?.name?.split(' ').map(n => n[0]).join('') || 'RE'}
               </div>
               <LogOut size={16} className="text-slate-500" />
            </div>
          </div>
        </header>

        <div className="p-8 max-w-[1400px] w-full">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default ReceptionistDashboard;
