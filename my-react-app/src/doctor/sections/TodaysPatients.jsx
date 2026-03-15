import { useState } from 'react';
import { Search } from 'lucide-react';
import Badge from '../Badge';

const patients = [
  { initials: 'VS', name: 'Vikram Shah', details: '10:00 • Chest pain, ECG abnormal', status: 'Critical', avatarColor: 'bg-red-100 text-red-700' },
  { initials: 'PM', name: 'Priya Mehta', details: '10:15 • Follow-up • Hypertension', status: 'Checked in', avatarColor: 'bg-yellow-100 text-yellow-700' },
  { initials: 'RK', name: 'Rahul Kumar', details: '10:30 • New patient • Palpitations', status: 'Scheduled', avatarColor: 'bg-blue-100 text-blue-700' },
  { initials: 'NK', name: 'Neha Kapoor', details: '11:00 • Post-op review', status: 'Scheduled', avatarColor: 'bg-slate-200 text-slate-800' },
  { initials: 'AS', name: 'Anil Sharma', details: '11:30 • Diabetes + cardiac risk', status: 'Lab pending', avatarColor: 'bg-yellow-100 text-yellow-700' },
  { initials: 'MJ', name: 'Meera Joshi', details: '14:00 • Follow-up • Arrhythmia', status: 'Scheduled', avatarColor: 'bg-purple-100 text-purple-700' },
];

const TodaysPatients = () => {
  const [search, setSearch] = useState('');
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-3xl animate-in fade-in">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#1A3C40]">Today's patients</h2>
        <p className="text-slate-500 text-sm mt-1 font-medium">{patients.length} patients scheduled · Fri 13 Mar</p>
      </div>
      <div className="relative mb-5">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search patient name..."
          className="w-full bg-white border border-[#7C9070]/20 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] shadow-sm transition-all"
        />
      </div>
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 overflow-hidden shadow-sm">
        {filtered.map((p, i, arr) => (
          <div key={i} className={`flex items-center gap-4 px-6 py-4 hover:bg-[#7C9070]/5 cursor-pointer transition-all ${i !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
            <div className={`w-11 h-11 rounded-full ${p.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm`}>{p.initials}</div>
            <div className="flex-1">
              <p className="text-sm font-bold text-[#1A3C40]">{p.name}</p>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">{p.details}</p>
            </div>
            <Badge label={p.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodaysPatients;