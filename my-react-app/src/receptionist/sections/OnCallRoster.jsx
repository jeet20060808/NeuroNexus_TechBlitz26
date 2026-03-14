import React from 'react';

const OnCallRoster = () => {
  return (
    <div className="animate-in fade-in max-w-4xl">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">On call tonight</p>
          <h2 className="text-3xl text-slate-900 font-semibold">3</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Swap requests</p>
          <h2 className="text-3xl text-slate-900 font-semibold">1</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Tonight's on-call team — Fri 13 Mar</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-[#3b82f633]">
            <tr>
              <th className="pb-2">Doctor</th>
              <th className="pb-2">Department</th>
              <th className="pb-2">Shift</th>
              <th className="pb-2">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#3b82f633]/50">
              <td className="py-3 text-slate-900">Dr. A. Patel</td>
              <td className="py-3 text-slate-600">Cardiology</td>
              <td className="py-3 text-slate-600">Night • 9 PM-8 AM</td>
              <td className="py-3 text-green-400">Confirmed</td>
            </tr>
            <tr>
              <td className="py-3 text-slate-900">Dr. P. Rao</td>
              <td className="py-3 text-slate-600">Pediatrics</td>
              <td className="py-3 text-slate-600">Night • 9 PM-8 AM</td>
              <td className="py-3 text-green-400">Confirmed</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OnCallRoster;
