import { useState } from 'react';
import { Search } from 'lucide-react';

const allPatients = [
  { initials: 'VS', name: 'Vikram Shah', id: 'PT-001', age: 54, condition: 'NSTEMI', lastVisit: '13 Mar 2026', avatarColor: 'bg-red-100 text-red-700' },
  { initials: 'PM', name: 'Priya Mehta', id: 'PT-002', age: 45, condition: 'Hypertension', lastVisit: '13 Mar 2026', avatarColor: 'bg-green-100 text-green-700' },
  { initials: 'RK', name: 'Rahul Kumar', id: 'PT-003', age: 32, condition: 'Palpitations', lastVisit: '13 Mar 2026', avatarColor: 'bg-blue-100 text-blue-700' },
  { initials: 'NK', name: 'Neha Kapoor', id: 'PT-004', age: 38, condition: 'Post-op cardiac', lastVisit: '11 Mar 2026', avatarColor: 'bg-green-100 text-green-700' },
  { initials: 'AS', name: 'Anil Sharma', id: 'PT-005', age: 61, condition: 'Diabetes + cardiac risk', lastVisit: '13 Mar 2026', avatarColor: 'bg-yellow-100 text-yellow-700' },
  { initials: 'MJ', name: 'Meera Joshi', id: 'PT-006', age: 49, condition: 'Arrhythmia', lastVisit: '10 Mar 2026', avatarColor: 'bg-purple-100 text-purple-700' },
  { initials: 'DP', name: 'Dev Patel', id: 'PT-007', age: 57, condition: 'Heart failure', lastVisit: '8 Mar 2026', avatarColor: 'bg-red-100 text-red-700' },
];

const PatientSearch = () => {
  const [query, setQuery] = useState('');
  const results = query.length > 0
    ? allPatients.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.id.includes(query))
    : [];

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Patient search</h2>
        <p className="text-slate-500 text-sm mt-1">Search by name or patient ID</p>
      </div>
      <div className="relative mb-6">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search name or patient ID..."
          className="w-full bg-white border border-[#3b82f633] rounded-xl py-4 pl-12 pr-4 text-sm text-slate-800 outline-none focus:border-[#4A6FA5] placeholder-gray-600"
        />
      </div>
      {query.length === 0 && <p className="text-center text-slate-400 text-sm py-16">Start typing to search patients</p>}
      {query.length > 0 && results.length === 0 && <p className="text-center text-slate-400 text-sm py-16">No patients found for "{query}"</p>}
      {results.length > 0 && (
        <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
          {results.map((p, i, arr) => (
            <div key={i} className={`flex items-center gap-4 px-5 py-4 hover:bg-blue-100 cursor-pointer transition-colors ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
              <div className={`w-10 h-10 rounded-full ${p.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{p.initials}</div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900">{p.name}</p>
                  <span className="text-xs text-slate-400">{p.id}</span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Age {p.age} · {p.condition}</p>
              </div>
              <span className="text-xs text-slate-400">Last visit: {p.lastVisit}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PatientSearch;