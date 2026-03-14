import { useState } from 'react';
import { Clock, ChevronLeft, ChevronRight } from 'lucide-react';
import Badge from '../Badge';

const schedule = [
  { time: '09:00', patient: 'Vikram Shah', type: 'Follow-up', status: 'Confirmed', initials: 'VS', avatarColor: 'bg-red-100 text-red-700' },
  { time: '10:00', patient: 'Priya Mehta', type: 'New patient', status: 'Confirmed', initials: 'PM', avatarColor: 'bg-green-100 text-green-700' },
  { time: '10:30', patient: 'Rahul Kumar', type: 'Post-op review', status: 'Pending', initials: 'RK', avatarColor: 'bg-blue-100 text-blue-700' },
  { time: '11:00', patient: 'Neha Kapoor', type: 'Consultation', status: 'Confirmed', initials: 'NK', avatarColor: 'bg-green-100 text-green-700' },
  { time: '11:30', patient: 'Anil Sharma', type: 'Lab review', status: 'Pending', initials: 'AS', avatarColor: 'bg-yellow-100 text-yellow-700' },
  { time: '14:00', patient: 'Meera Joshi', type: 'Follow-up', status: 'Confirmed', initials: 'MJ', avatarColor: 'bg-purple-100 text-purple-700' },
  { time: '15:30', patient: 'Sunita Rao', type: 'Consultation', status: 'Cancelled', initials: 'SR', avatarColor: 'bg-slate-200 text-slate-800' },
];

const days = ['Mon 10', 'Tue 11', 'Wed 12', 'Thu 13', 'Fri 14', 'Sat 15'];

const MySchedule = () => {
  const [activeDay, setActiveDay] = useState('Fri 14');

  return (
    <div className="p-8 max-w-3xl">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">My schedule</h2>
          <p className="text-slate-500 text-sm mt-1">March 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg border border-[#3b82f633] hover:bg-blue-100 transition-colors"><ChevronLeft size={14} className="text-slate-600" /></button>
          <button className="px-4 py-2 rounded-lg bg-blue-100 text-slate-900 text-sm font-medium">Today</button>
          <button className="p-2 rounded-lg border border-[#3b82f633] hover:bg-blue-100 transition-colors"><ChevronRight size={14} className="text-slate-600" /></button>
        </div>
      </div>

      <div className="flex gap-1 mb-6 bg-white p-1.5 rounded-xl border border-[#3b82f633]">
        {days.map(d => (
          <button key={d} onClick={() => setActiveDay(d)} className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all ${activeDay === d ? 'bg-blue-100 text-slate-900' : 'text-slate-500 hover:bg-blue-100'}`}>{d}</button>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-3 mb-6">
        {[{ l: 'Total', v: '7' }, { l: 'Confirmed', v: '5' }, { l: 'Pending', v: '2' }].map(s => (
          <div key={s.l} className="bg-white rounded-xl border border-[#3b82f633] p-4">
            <p className="text-xs text-slate-500 mb-1">{s.l}</p>
            <p className="text-2xl font-semibold text-slate-900">{s.v}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
        {schedule.map((s, i, arr) => (
          <div key={i} className={`flex items-center gap-4 px-5 py-3.5 ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
            <div className="w-14 text-xs text-slate-500 flex items-center gap-1 flex-shrink-0"><Clock size={11} />{s.time}</div>
            <div className={`w-8 h-8 rounded-full ${s.avatarColor} flex items-center justify-center text-xs font-bold flex-shrink-0`}>{s.initials}</div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{s.patient}</p>
              <p className="text-xs text-slate-500">{s.type}</p>
            </div>
            <Badge label={s.status} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MySchedule;