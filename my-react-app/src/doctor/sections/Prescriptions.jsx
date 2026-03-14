import { useState } from 'react';
import Badge from '../Badge';

const allRx = [
  { drug: 'Metoprolol 25mg', patient: 'Priya Mehta', details: '1 tab twice daily • 30 days', status: 'Signed', dot: 'bg-purple-400' },
  { drug: 'Atorvastatin 40mg', patient: 'Anil Sharma', details: '1 tab at night • 60 days • Awaiting sign-off', status: 'Pending', dot: 'bg-orange-400' },
  { drug: 'Losartan 50mg', patient: 'Neha Kapoor', details: '1 tab daily • 90 days', status: 'Signed', dot: 'bg-green-400' },
  { drug: 'Heparin IV', patient: 'Vikram Shah', details: '5000 IU stat • Emergency order', status: 'Urgent', dot: 'bg-blue-400' },
  { drug: 'Warfarin 5mg', patient: 'Vikram Shah', details: '1 tab daily • INR monitoring', status: 'Signed', dot: 'bg-teal-400' },
  { drug: 'Amlodipine 5mg', patient: 'Neha Kapoor', details: '1 tab morning • 30 days', status: 'Signed', dot: 'bg-cyan-400' },
];

const Prescriptions = () => {
  const [filter, setFilter] = useState('all');
  const filtered = filter === 'all' ? allRx : allRx.filter(r => r.status.toLowerCase() === filter);

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Prescriptions</h2>
      </div>
      <div className="flex gap-2 mb-5">
        {['all', 'signed', 'pending', 'urgent'].map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-full text-xs font-semibold capitalize transition-all ${filter === f ? 'bg-blue-100 text-slate-900' : 'bg-white border border-[#3b82f633] text-slate-600 hover:bg-blue-100'}`}>
            {f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        {filtered.map((rx, i) => (
          <div key={i} className="bg-white rounded-xl border border-[#3b82f633] p-4 hover:border-blue-200 transition-all">
            <div className="flex justify-between items-start mb-1">
              <p className="text-sm font-medium text-slate-900">{rx.drug}</p>
              <Badge label={rx.status} />
            </div>
            <p className="text-xs text-slate-500 mb-2">{rx.patient}</p>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${rx.dot}`} />
              <p className="text-slate-600 text-[11px]">{rx.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Prescriptions;