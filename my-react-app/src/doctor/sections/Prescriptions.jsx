import { useState, useEffect } from 'react';
import Badge from '../Badge';
import { api } from '../../api';

const Prescriptions = ({ user }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(false);

  // For now, clearing dummy data as requested.
  // Real implementation would fetch based on doctor's signed prescriptions.

  return (
    <div className="p-8 max-w-4xl animate-in fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#1A3C40]">Prescriptions</h2>
        <p className="text-slate-500 text-sm mt-1">Manage and sign patient prescriptions.</p>
      </div>

      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-12 text-center shadow-sm">
        <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4">
           <svg size={24} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <p className="text-slate-500 font-medium">No prescriptions found.</p>
        <p className="text-slate-400 text-xs mt-1">Prescriptions issued during consultations will appear here.</p>
      </div>
    </div>
  );
};

export default Prescriptions;