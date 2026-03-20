import React from 'react';

const TodaysQueue = ({ appointments = [] }) => {
  return (
    <div className="animate-in fade-in">
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 shadow-xl overflow-hidden">
        <div className="p-8 border-b border-[#7C9070]/10 bg-slate-50/50 flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-serif text-[#1A3C40] mb-1">Today's Patient Queue</h3>
            <p className="text-[#7C9070] text-xs font-black uppercase tracking-widest">Live clinical status monitor</p>
          </div>
          <div className="flex gap-4">
            <span className="bg-orange-100 text-orange-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border border-orange-200">
              {appointments.filter(a => a.status === 'REMAINING').length} Remaining
            </span>
            <span className="bg-blue-100 text-blue-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border border-blue-200 animate-pulse">
              {appointments.filter(a => a.status === 'ONGOING').length} Ongoing
            </span>
            <span className="bg-green-100 text-green-700 text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-tighter shadow-sm border border-green-200">
              {appointments.filter(a => a.status === 'DONE').length} Done
            </span>
          </div>
        </div>
        
        <table className="w-full text-left">
          <thead>
            <tr className="bg-white text-[#7C9070] border-b border-[#7C9070]/10">
              <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Time</th>
              <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Patient Name</th>
              <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest">Assigned Doctor</th>
              <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest text-center">Contact</th>
              <th className="px-8 py-5 font-black uppercase text-[10px] tracking-widest text-right">Current Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-20 text-center text-slate-400 italic font-medium">No patients in queue for today.</td>
              </tr>
            ) : (
              appointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-[#7C9070]/5 transition-all group">
                  <td className="px-8 py-5">
                    <div className="px-3 py-1 bg-slate-100 rounded-lg text-[#1A3C40] font-black text-xs inline-block">
                      {apt.start_time}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="font-bold text-[#1A3C40] text-base">{apt.patient_name}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">ID: {apt.id.split('-')[0]}</p>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[#1A3C40] font-medium">{apt.doctor_name}</p>
                    <p className="text-[10px] text-[#7C9070] font-bold uppercase">OPD Consultation</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <p className="text-xs font-bold text-slate-500 font-mono tracking-tighter">{apt.phone || '—'}</p>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <span className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl shadow-sm border transition-all ${
                      apt.status === 'DONE' ? 'bg-green-50 text-green-700 border-green-100' :
                      apt.status === 'ONGOING' ? 'bg-blue-50 text-blue-700 border-blue-100 shadow-blue-100/50 scale-105' :
                      'bg-orange-50 text-orange-700 border-orange-100'
                    }`}>
                      {apt.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodaysQueue;
