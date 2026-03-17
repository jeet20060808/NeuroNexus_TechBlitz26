import { useState, useEffect } from 'react';
import { Search, History, AlertCircle } from 'lucide-react';
import Badge from '../Badge';
import { api } from '../../api';

const TodaysPatients = ({ user }) => {
  const [search, setSearch] = useState('');
  const [patientsList, setPatientsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.getDoctorPatients(user.id)
        .then(data => {
          setPatientsList(data.patients || []);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load doctor's patients:", err);
          setLoading(false);
        });
    }
  }, [user?.id]);

  const filtered = (patientsList || []).filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  if (loading) return <div className="p-16 text-center text-slate-500">Loading your patient list...</div>;

  return (
    <div className="p-8 max-w-4xl animate-in fade-in">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-serif text-[#1A3C40]">Your Patients</h2>
          <p className="text-[#7C9070] text-sm mt-1 font-bold uppercase tracking-wider">
            {patientsList.length} patients registered for you
          </p>
        </div>
        <div className="flex gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#7C9070]" size={18} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search within your patient history..."
          className="w-full bg-white border border-[#7C9070]/20 rounded-2xl py-4 pl-12 pr-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] shadow-sm transition-all focus:ring-4 focus:ring-[#7C9070]/5"
        />
      </div>

      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 overflow-hidden shadow-sm">
        {patientsList.length === 0 ? (
          <div className="p-12 text-center">
            <AlertCircle className="mx-auto text-slate-300 mb-3" size={32} />
            <p className="text-slate-500 text-sm">No patients have been assigned to you yet.</p>
            <p className="text-slate-400 text-xs mt-1">Assignments made by the receptionist will appear here.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 italic">No matches for "{search}"</div>
        ) : (
          filtered.map((p, i) => (
            <div key={p.id} className={`flex items-center gap-5 px-8 py-5 hover:bg-[#7C9070]/5 cursor-pointer transition-all group ${i !== filtered.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-12 h-12 rounded-2xl bg-[#7C9070]/10 text-[#1A3C40] flex items-center justify-center text-sm font-black flex-shrink-0 group-hover:bg-[#7C9070] group-hover:text-white transition-colors uppercase">
                {p.name.charAt(0)}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-base font-bold text-[#1A3C40]">{p.name}</p>
                  <History size={12} className="text-[#7C9070] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex gap-4 mt-1">
                  <p className="text-xs text-slate-500 font-medium">{p.gender || 'Unknown'} • {p.phone || 'No phone'}</p>
                  <p className="text-xs text-[#7C9070] font-bold uppercase tracking-tighter">View Full Medical History</p>
                </div>
              </div>
              <Badge label="Registered" />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysPatients;