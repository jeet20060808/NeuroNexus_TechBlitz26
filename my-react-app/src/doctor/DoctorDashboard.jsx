import React, { useState } from 'react';
import { Stethoscope } from 'lucide-react';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import MyDashboard from './sections/MyDashboard';
import TodaysPatients from './sections/TodaysPatients';
import MySchedule from './sections/MySchedule';
import PatientSearch from './sections/PatientSearch';
import WriteNotes from './sections/WriteNotes';
import Prescriptions from './sections/Prescriptions';
import ReferralsSection from './sections/Referrals';
import MedicalHistory from './sections/MedicalHistory';

const DoctorDashboard = ({ user, onLogout }) => {
  const [currentTab, setCurrentTab] = useState('My dashboard');

  const patientQueue = [];

  const prescriptions = [];

  const labs = [];

  const referrals = [];

  const renderContent = () => {
    switch(currentTab) {
      case 'My dashboard': return <MyDashboard patientQueue={patientQueue} prescriptions={prescriptions} labs={labs} referrals={referrals} />;
      case "Today's patients": return <TodaysPatients user={user} />;
      case 'My schedule': return <MySchedule />;
      case 'Patient search': return <PatientSearch />;
      case 'Write notes': return <WriteNotes />;
      case 'Prescriptions': return <Prescriptions />;
      case 'Referrals': return <ReferralsSection />;
      case 'Medical history': return <MedicalHistory />;
      default: return (
        <div className="p-16 flex flex-col items-center justify-center text-center h-full">
           <Stethoscope size={48} className="text-slate-400 mb-4" />
           <h3 className="text-xl text-slate-700 font-medium mb-2">{currentTab}</h3>
           <p className="text-slate-500 max-w-sm">This module is part of the clinical suite and helps bridge communication between the receptionist and medical staff.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] text-[#1A3C40] flex font-sans">
      <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      <main className="ml-64 flex-1 flex flex-col min-h-screen">
        <TopBar user={user} onLogout={onLogout} />
        {renderContent()}
      </main>
    </div>
  );
};

export default DoctorDashboard;
