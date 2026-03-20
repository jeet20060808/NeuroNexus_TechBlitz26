import React from 'react';

const Overview = ({ appointments = [], doctors = [] }) => {
  const waitingCount = appointments.filter(a => a.status === 'REMAINING').length;
  const inConsultCount = appointments.filter(a => a.status === 'ONGOING').length;
  const completedCount = appointments.filter(a => a.status === 'DONE').length;

  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-[32px] border border-[#7C9070]/20 shadow-sm">
          <p className="text-[#7C9070] text-xs font-black uppercase tracking-widest mb-2">Total Appts</p>
          <h2 className="text-4xl text-[#1A3C40] font-serif font-bold">{appointments.length}</h2>
          <p className="text-slate-400 text-xs mt-1">for today</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-[#7C9070]/20 shadow-sm">
          <p className="text-orange-500 text-xs font-black uppercase tracking-widest mb-2">In Waiting</p>
          <h2 className="text-4xl text-orange-600 font-serif font-bold">{waitingCount}</h2>
          <p className="text-slate-400 text-xs mt-1">awaiting doctor</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-[#7C9070]/20 shadow-sm">
          <p className="text-blue-500 text-xs font-black uppercase tracking-widest mb-2">In Consult</p>
          <h2 className="text-4xl text-blue-600 font-serif font-bold">{inConsultCount}</h2>
          <p className="text-slate-400 text-xs mt-1">active sessions</p>
        </div>
        <div className="bg-white p-6 rounded-[32px] border border-[#7C9070]/20 shadow-sm border-b-4 border-b-[#7C9070]">
          <p className="text-[#7C9070] text-xs font-black uppercase tracking-widest mb-2">Completed</p>
          <h2 className="text-4xl text-[#1A3C40] font-serif font-bold">{completedCount}</h2>
          <p className="text-slate-400 text-xs mt-1">successfully seen</p>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-8 bg-white rounded-[32px] border border-[#7C9070]/20 shadow-sm p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-serif text-[#1A3C40]">Current Queue Live</h3>
            <span className="text-[10px] font-black bg-[#7C9070]/10 text-[#7C9070] px-3 py-1 rounded-full uppercase">Real-time status</span>
          </div>
          
          <div className="overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[#7C9070] border-b border-[#7C9070]/10">
                  <th className="pb-4 font-black uppercase text-[10px] tracking-widest">Patient</th>
                  <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-center">Time</th>
                  <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-center">Status</th>
                  <th className="pb-4 font-black uppercase text-[10px] tracking-widest text-right">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {appointments.slice(0, 8).map((apt) => (
                  <tr key={apt.id} className="border-b border-slate-50 last:border-0 hover:bg-[#7C9070]/5 transition-all group">
                    <td className="py-4">
                      <p className="font-bold text-[#1A3C40] group-hover:translate-x-1 transition-transform">{apt.first_name} {apt.last_name}</p>
                      <p className="text-[10px] text-slate-400 uppercase font-bold">{apt.patient_id.split('-')[0]}</p>
                    </td>
                    <td className="py-4 text-center font-medium text-slate-600">{apt.start_time}</td>
                    <td className="py-4 text-center">
                      <span className={`text-[10px] font-black uppercase px-2 py-1 rounded-lg ${
                        apt.status === 'DONE' ? 'bg-green-100 text-green-700' :
                        apt.status === 'ONGOING' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {apt.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <p className="font-black text-[11px] text-[#7C9070] uppercase">{apt.doctor_name}</p>
                    </td>
                  </tr>
                ))}
                {appointments.length === 0 && (
                  <tr><td colSpan="4" className="py-20 text-center text-slate-400 italic">No appointments scheduled for today.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-4 space-y-8">
          <div className="bg-white rounded-[32px] border border-[#7C9070]/20 shadow-sm p-8">
            <h3 className="text-xl font-serif text-[#1A3C40] mb-6">Doctor Status</h3>
            <div className="space-y-6">
              {doctors.map(doc => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${doc.status === 'available' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]' : 'bg-orange-500'}`}></div>
                    <div>
                      <p className="text-sm font-bold text-[#1A3C40]">{doc.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">{doc.specialization}</p>
                    </div>
                  </div>
                  <span className={`text-[10px] font-black uppercase ${doc.status === 'available' ? 'text-[#7C9070]' : 'text-orange-500'}`}>
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;

