import React from 'react';

const ViewSchedule = ({ patients }) => {
  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Today's total</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">{patients.length + 34}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Completed</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">28</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Upcoming</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">6</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-6">Daily view — Fri 13 Mar 2026</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-[#3b82f633]">
            <tr>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Room</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#3b82f633]/50">
              <td className="py-3 text-slate-700">09:00</td>
              <td className="py-3 text-slate-900">Karan Iyer</td>
              <td className="py-3 text-slate-600">Dr. Mehta</td>
              <td className="py-3 text-slate-600">101</td>
              <td className="py-3"><span className="text-green-500 font-medium">Done</span></td>
            </tr>
            <tr className="border-b border-[#3b82f633]/50">
              <td className="py-3 text-slate-700">09:15</td>
              <td className="py-3 text-slate-900">Ananya Bose</td>
              <td className="py-3 text-slate-600">Dr. Rao</td>
              <td className="py-3 text-slate-600">108</td>
              <td className="py-3"><span className="text-red-500 font-medium bg-red-100/20 px-2 py-1 rounded">No-show</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
        <h3 className="font-semibold text-slate-900 mb-4">This week at a glance</h3>
        <div className="flex gap-4">
          {['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13', 'Sat 14', 'Sun 15'].map((d, i) => (
            <div key={i} className={`flex-1 p-4 rounded text-center cursor-pointer ${i === 4 ? 'bg-[#4A90E2] text-slate-900' : i === 1 ? 'bg-red-100/20 text-red-300' : 'bg-[#3b82f633] text-slate-600 hover:bg-[#333]'}`}>
              <p className="text-xs mb-1 uppercase">{d.split(' ')[0]}</p>
              <p className="text-xl font-bold">{d.split(' ')[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;
