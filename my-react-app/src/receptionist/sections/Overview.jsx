import React from 'react';

const Overview = ({ patients, doctors = [] }) => {
  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">In Waiting Room</p>
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">8</h2>
          <p className="text-slate-500 text-xs">avg wait 14 min</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Appts Today</p>
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">{patients.length + 34}</h2>
          <p className="text-slate-500 text-xs">{patients.length} remaining</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Doctors On Duty</p>
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">{doctors.length}</h2>
          <p className="text-slate-500 text-xs">{doctors.filter(d => d.status === 'in consult').length} in consult</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Walk-ins Today</p>
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">12</h2>
          <p className="text-slate-500 text-xs">3 urgent</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5 space-y-6">
          <div className="bg-white rounded-xl border border-[#7C9070]/20 shadow-sm overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-[#7C9070]/10">
              <h3 className="font-semibold text-[#1A3C40]">Today's queue</h3>
              <span className="bg-[#7C9070]/10 text-[#7C9070] text-xs px-2 py-1 rounded font-bold">{patients.length} waiting</span>
            </div>
            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto">
              {patients.length === 0 ? (
                <p className="text-slate-500 text-sm">Queue is empty</p>
              ) : (
                patients.slice(0, 5).map((q) => (
                  <div key={q.id} className="flex justify-between items-center border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold bg-[#7C9070]/10 text-[#1A3C40]">
                        {q.initials || q.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[#1A3C40] font-medium text-sm">{q.name}</p>
                        <p className="text-slate-500 text-xs">{q.doctor_name || q.doctor || 'Unassigned'} • {q.time || 'N/A'}</p>
                      </div>
                    </div>
                    <span className={`${q.color === 'bg-slate-200' ? 'bg-[#7C9070]/10 text-[#7C9070]' : q.color} ${q.text || 'text-slate-800'} text-[10px] px-2 py-1 rounded font-bold`}>
                      {q.queueStatus || 'Waiting'}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="col-span-12 lg:col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-[#7C9070]/20 shadow-sm p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-[#1A3C40]">Doctor status</h3>
              <span className="text-[11px] text-[#7C9070] font-bold uppercase tracking-wider">Live Updates</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="text-slate-500 border-b border-[#7C9070]/10">
                    <th className="pb-2 font-medium">Doctor</th>
                    <th className="pb-2 font-medium">Specialty</th>
                    <th className="pb-2 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length === 0 ? (
                    <tr><td colSpan="3" className="py-4 text-center text-slate-400 italic text-sm">No doctors registered in this clinic yet.</td></tr>
                  ) : (
                    doctors.map((doc, idx) => (
                      <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-[#7C9070]/5 transition-colors">
                        <td className="py-3 text-[#1A3C40] font-bold">{doc.name}</td>
                        <td className="py-3 text-slate-600 text-xs font-medium uppercase tracking-tight">{doc.specialization || "General"}</td>
                        <td className="py-3">
                          <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold shadow-sm ${
                            doc.status === 'available' ? 'bg-[#7C9070]/10 text-[#7C9070]' : 
                            doc.status === 'in consult' ? 'bg-orange-100 text-orange-700' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {doc.status || "offline"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
