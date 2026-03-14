import React from 'react';

const Availability = () => {
  return (
    <div className="animate-in fade-in bg-white rounded-xl border border-[#3b82f633] p-6 max-w-4xl">
      <h3 className="font-semibold text-slate-900 mb-6">Doctor availability — week of 9-15 Mar 2026</h3>
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#3b82f633] p-4 rounded-xl border border-[#3b82f633]">
          <h4 className="text-slate-900 font-medium mb-1">Dr. Mehta • Cardiology • Room 101</h4>
          <p className="text-xs text-slate-500 mb-3">Mon-Fri • 9 AM-6 PM</p>
          <span className="bg-red-100/20 text-red-400 text-xs px-2 py-1 rounded font-medium">In consult now</span>
          <p className="text-xs text-slate-600 mt-4 mb-2">Next free: 10:45 AM</p>
          <div className="flex gap-2">
            <span className="bg-green-100/20 text-green-400 text-xs px-2 py-1 rounded">11:00</span>
            <span className="bg-green-100/20 text-green-400 text-xs px-2 py-1 rounded">11:15</span>
          </div>
        </div>
        <div className="bg-[#3b82f633] p-4 rounded-xl border border-[#3b82f633]">
          <h4 className="text-slate-900 font-medium mb-1">Dr. Singh • Cardiology • Room 203</h4>
          <p className="text-xs text-slate-500 mb-3">Mon-Fri • 8 AM-5 PM</p>
          <span className="bg-green-100/20 text-green-400 text-xs px-2 py-1 rounded font-medium">Available now</span>
          <p className="text-xs text-slate-600 mt-4 mb-2">Open slots today</p>
          <div className="flex gap-2">
            <span className="bg-green-100/20 text-green-400 text-xs px-2 py-1 rounded">09:45</span>
            <span className="bg-green-100/20 text-green-400 text-xs px-2 py-1 rounded">10:00</span>
          </div>
        </div>
      </div>
      <h3 className="font-semibold text-slate-900 mb-4">Upcoming leaves & holidays</h3>
      <table className="w-full text-sm text-left">
        <thead className="text-slate-500 border-b border-[#3b82f633]">
          <tr>
            <th className="pb-2">Doctor</th>
            <th className="pb-2">Date(s)</th>
            <th className="pb-2">Type</th>
            <th className="pb-2">Cover arranged</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#3b82f633]/50">
            <td className="py-3 text-slate-700">Dr. Rao</td>
            <td className="py-3 text-slate-600">14 Mar 2026</td>
            <td className="py-3 text-slate-600">Personal leave</td>
            <td className="py-3 text-green-400">Dr. Lal covering</td>
          </tr>
          <tr>
            <td className="py-3 text-slate-700">Dr. Singh</td>
            <td className="py-3 text-slate-600">20-22 Mar 2026</td>
            <td className="py-3 text-slate-600">Conference</td>
            <td className="py-3 text-yellow-400">Pending</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Availability;
