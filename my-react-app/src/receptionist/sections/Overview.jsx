import React from 'react';

const Overview = ({ patients, doctorStatus }) => {
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
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">5</h2>
          <p className="text-slate-500 text-xs">2 in consult</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1">Walk-ins Today</p>
          <h2 className="text-3xl text-[#1A3C40] font-semibold mb-1">12</h2>
          <p className="text-slate-500 text-xs">3 urgent</p>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 space-y-6">
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
                        <p className="text-slate-500 text-xs">{q.doctor || 'Unassigned'} • {q.time || 'N/A'}</p>
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
        <div className="col-span-7 space-y-6">
          <div className="bg-white rounded-xl border border-[#7C9070]/20 shadow-sm p-4">
            <h3 className="font-semibold text-[#1A3C40] mb-4">Doctor status</h3>
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="text-slate-500 border-b border-[#7C9070]/10">
                  <th className="pb-2 font-medium">Doctor</th>
                  <th className="pb-2 font-medium">Specialty</th>
                  <th className="pb-2 font-medium">Room</th>
                  <th className="pb-2 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {doctorStatus.map((doc, idx) => (
                  <tr key={idx} className="border-b border-slate-50 last:border-0">
                    <td className="py-3 text-[#1A3C40] font-medium">{doc.name}</td>
                    <td className="py-3 text-slate-600">{doc.spec}</td>
                    <td className="py-3 text-slate-600">{doc.room}</td>
                    <td className="py-3">
                      <span className={`${doc.color} text-[10px] px-2 py-1 rounded font-bold`}>
                        {doc.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
