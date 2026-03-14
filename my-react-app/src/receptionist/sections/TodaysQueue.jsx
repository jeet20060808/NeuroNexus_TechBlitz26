import React from 'react';

const TodaysQueue = ({ patients }) => {
  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Total in queue</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">{patients.length}</h2>
          <p className="text-slate-500 text-xs">3 urgent</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Avg wait time</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">14 min</h2>
          <p className="text-slate-500 text-xs">target: 10 min</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Checked in</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">4</h2>
          <p className="text-slate-500 text-xs">today so far</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">No-shows</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">2</h2>
          <p className="text-slate-500 text-xs">today</p>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-4">
        <h3 className="font-semibold text-slate-900 mb-4">Full queue — Fri 13 Mar</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-[#3b82f633]">
            <tr>
              <th className="pb-3 font-medium">#</th>
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Appt time</th>
              <th className="pb-3 font-medium">Wait</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td colSpan="6" className="py-4 text-center text-slate-500">No patients in queue</td>
              </tr>
            ) : (
              patients.map((p, i) => (
                <tr key={p.id} className="border-b border-[#3b82f633]/50 hover:bg-blue-100/30">
                  <td className="py-4 text-slate-600">{i + 1}</td>
                  <td className="py-4 text-slate-900 font-medium">{p.name}</td>
                  <td className="py-4 text-slate-700">{p.doctor || 'Unassigned'}</td>
                  <td className="py-4 text-slate-600">{p.time || 'N/A'}</td>
                  <td className="py-4 text-slate-600">0 min</td>
                  <td className="py-4">
                    <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
                      {p.queueStatus || 'Waiting'}
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
