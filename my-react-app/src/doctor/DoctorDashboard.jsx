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

  const patientQueue = [
    { initials: 'VS', name: 'Vikram Shah', details: '10:00 • Chest pain, ECG abnormal', status: 'Critical', color: 'bg-red-100', text: 'text-red-700', dot: 'bg-red-500' },
    { initials: 'PM', name: 'Priya Mehta', details: '10:15 • Follow-up • Hypertension', status: 'Checked in', color: 'bg-green-100', text: 'text-green-700', dot: 'bg-yellow-500' },
    { initials: 'RK', name: 'Rahul Kumar', details: '10:30 • New patient • Palpitations', status: 'Scheduled', color: 'bg-slate-200', text: 'text-slate-800', dot: 'bg-teal-500' },
    { initials: 'NK', name: 'Neha Kapoor', details: '11:00 • Post-op review', status: 'Scheduled', color: 'bg-slate-200', text: 'text-slate-800', dot: 'bg-purple-500' },
    { initials: 'AS', name: 'Anil Sharma', details: '11:30 • Diabetes + cardiac risk', status: 'Lab pending', color: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-green-500' },
  ];

  const prescriptions = [
    { drug: 'Metoprolol 25mg', patient: 'Priya Mehta', details: '1 tab twice daily • 30 days', status: 'Signed', color: 'bg-transparent', text: 'text-slate-600', dot: 'bg-purple-400' },
    { drug: 'Atorvastatin 40mg', patient: 'Anil Sharma', details: '1 tab at night • 60 days • Awaiting sign-off', status: 'Pending', color: 'bg-yellow-100', text: 'text-yellow-700', dot: 'bg-orange-400' },
    { drug: 'Losartan 50mg', patient: 'Neha Kapoor', details: '1 tab daily • 90 days', status: 'Signed', color: 'bg-transparent', text: 'text-slate-600', dot: 'bg-green-400' },
    { drug: 'Heparin IV', patient: 'Vikram Shah', details: '5000 IU stat • Emergency order', status: 'Urgent', color: 'bg-red-100', text: 'text-red-700', dot: 'bg-blue-400' },
  ];

  const labs = [
    { patient: 'Vikram Shah', test: 'Troponin I', result: '0.8 ng/mL', flag: 'High', color: 'bg-red-100 text-red-700' },
    { patient: 'Anil Sharma', test: 'HbA1c', result: '8.4%', flag: 'Elevated', color: 'bg-yellow-100 text-yellow-700' },
    { patient: 'Priya Mehta', test: 'INR', result: '2.1', flag: 'Normal', color: 'bg-green-100 text-green-700' },
    { patient: 'Rahul Kumar', test: 'Chest X-ray', result: 'Clear', flag: 'Normal', color: 'bg-green-100 text-green-700' },
    { patient: 'Neha Kapoor', test: 'Lipid panel', result: 'LDL 142', flag: 'Borderline', color: 'bg-yellow-100 text-yellow-700' },
  ];

  const referrals = [
    { patient: 'Vikram Shah', to: 'ICU / Cardio', reason: 'NSTEMI w/' },
    { patient: 'Anil Sharma', to: 'Endocrinology', reason: 'DM manageme' },
    { patient: 'Rahul Kumar', to: 'Electrophysiology', reason: 'Palpitation' },
  ];

  const renderContent = () => {
    switch(currentTab) {
      case 'My dashboard': return <MyDashboard patientQueue={patientQueue} prescriptions={prescriptions} labs={labs} referrals={referrals} />;
      case "Today's patients": return <TodaysPatients />;
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
