import React, { useState, useEffect } from 'react';
import { LogOut, Trash2, X } from 'lucide-react';
import Overview from './sections/Overview';
import TodaysQueue from './sections/TodaysQueue';
import RegisterNew from './sections/RegisterNew';
import SearchPatient from './sections/SearchPatient';
import RecordsHistory from './sections/RecordsHistory';
import InsuranceBilling from './sections/InsuranceBilling';
import BookAppointment from './sections/BookAppointment';
import ViewSchedule from './sections/ViewSchedule';
import Cancellations from './sections/Cancellations';
import Reminders from './sections/Reminders';
import Availability from './sections/Availability';
import OnCallRoster from './sections/OnCallRoster';
import Reports from './sections/Reports';
import Settings from './sections/Settings';

// Custom Hook for Local Storage
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
  const [patients, setPatients] = useLocalStorage('clinic_patients', [
    { id: 1, name: 'Alice Johnson', phone: '+1-555-0101', email: 'alice@email.com', blood_group: 'O+', visits: 5, lastVisit: '2026-03-13', insurance: 'Blue Cross' },
    { id: 2, name: 'Bob Smith', phone: '+1-555-0102', email: 'bob@email.com', blood_group: 'A-', visits: 3, lastVisit: '2026-03-13', insurance: 'Aetna' },
    { id: 3, name: 'Carol White', phone: '+1-555-0103', email: 'carol@email.com', blood_group: 'B+', visits: 2, lastVisit: '2026-03-12', insurance: 'Cigna' },
  ]);
  const [registerForm, setRegisterForm] = useState({ firstName: '', lastName: '', doctor: '', time: '' });

  const handleAddPatient = (e) => {
    e.preventDefault();
    if (!registerForm.firstName) return;

    const initials = (registerForm.firstName[0] + (registerForm.lastName?.[0] || '')).toUpperCase();
    const fullName = `${registerForm.firstName} ${registerForm.lastName}`;
    const assignedTime = registerForm.time || new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

    const newPatient = {
      id: `P-00${Math.floor(Math.random() * 90 + 10)}`,
      initials,
      name: fullName,
      age: Math.floor(Math.random() * 60) + 18,
      phone: '+91 98200 ' + Math.floor(10000 + Math.random() * 90000),
      lastVisit: 'Today',
      details: `${assignedTime} • Walk-in`,
      doctor: registerForm.doctor || 'Unassigned',
      time: assignedTime,
      status: 'Active',
      queueStatus: 'Scheduled',
      color: 'bg-slate-200',
      text: 'text-slate-800',
      dot: 'bg-blue-400'
    };

    setPatients([...patients, newPatient]);
    setRegisterForm({ firstName: '', lastName: '', doctor: '', time: '' });
    setCurrentTab('Search Patient');
  };

  const handleDeletePatient = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const doctorStatus = [
    { name: 'Dr. Mehta', spec: 'General', room: '101', status: 'In Consult', color: 'bg-red-100 text-red-700' },
    { name: 'Dr. Singh', spec: 'Cardiology', room: '203', status: 'Available', color: 'bg-green-100 text-green-700' },
    { name: 'Dr. Patel', spec: 'Orthopedics', room: '105', status: 'Delayed', color: 'bg-yellow-100 text-yellow-700' },
  ];

  const renderSidebarItem = (tabName, dotColor) => (
    <li 
      onClick={() => setCurrentTab(tabName)} 
      className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-3 text-sm transition-colors ${currentTab === tabName ? 'bg-blue-100 text-slate-900' : 'text-slate-600 hover:bg-blue-100 hover:text-slate-900'}`}
    >
      <div className={`w-2 h-2 rounded-full ${dotColor}`}></div> {tabName}
    </li>
  );

  const renderContent = () => {
    switch (currentTab) {
      case 'Overview':
        return <Overview patients={patients} doctorStatus={doctorStatus} />;
      case "Today's Queue":
        return <TodaysQueue patients={patients} />;
      case 'Register New':
        return <RegisterNew registerForm={registerForm} setRegisterForm={setRegisterForm} handleAddPatient={handleAddPatient} setCurrentTab={setCurrentTab} />;
      case 'Search Patient':
        return <SearchPatient patients={patients} handleDeletePatient={handleDeletePatient} />;
      case 'Records & History':
        return <RecordsHistory />;
      case 'Insurance & Billing':
        return <InsuranceBilling />;
      case 'Book Appointment':
        return <BookAppointment setCurrentTab={setCurrentTab} />;
      case 'View Schedule':
        return <ViewSchedule patients={patients} />;
      case 'Cancellations':
        return <Cancellations />;
      case 'Reminders':
        return <Reminders />;
      case 'Availability':
        return <Availability />;
      case 'On-Call Roster':
        return <OnCallRoster />;
      case 'Reports':
        return <Reports />;
      case 'Settings':
        return <Settings />;
      default:
        return <Overview patients={patients} doctorStatus={doctorStatus} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#3b82f633] text-slate-800 flex font-sans">
      {/* SIDEBAR */}
      <aside className="w-64 bg-white h-screen fixed flex flex-col border-r border-[#3b82f633] z-20">
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
              {renderSidebarItem('Reminders', 'bg-gray-400')}
            </ul>
          </div>
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Doctors</p>
            <ul>
              {renderSidebarItem('Availability', 'bg-gray-400')}
              {renderSidebarItem('On-Call Roster', 'bg-blue-400')}
            </ul>
          </div>
          <div className="px-3 mb-6">
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">Admin</p>
            <ul>
              {renderSidebarItem('Reports', 'bg-gray-400')}
              {renderSidebarItem('Settings', 'bg-gray-400')}
            </ul>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <header className="h-16 flex items-center justify-between px-8 border-b border-[#3b82f633] sticky top-0 bg-[#3b82f633] z-10">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-slate-900">MediDesk — Reception</h1>
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
