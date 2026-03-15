import React from 'react';

const ViewSchedule = ({ patients }) => {
  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1 font-medium">Today's total</p>
          <h2 className="text-3xl text-[#1A3C40] font-bold mb-1">{patients.length + 34}</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1 font-medium">Completed</p>
          <h2 className="text-3xl text-[#7C9070] font-bold mb-1">28</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#7C9070]/20 shadow-sm">
          <p className="text-slate-600 text-sm mb-1 font-medium">Upcoming</p>
          <h2 className="text-3xl text-[#1A3C40] font-bold mb-1">6</h2>
        </div>
      </div>
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-6 mb-6 shadow-sm">
        <h3 className="font-bold text-[#1A3C40] mb-6">Daily view — Fri 13 Mar 2026</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-[#7C9070]/10">
            <tr>
              <th className="pb-3 font-medium">Time</th>
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Room</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-50 hover:bg-[#7C9070]/5 transition-colors">
              <td className="py-3.5 text-slate-700 font-medium">09:00</td>
              <td className="py-3.5 text-[#1A3C40] font-bold">Karan Iyer</td>
              <td className="py-3.5 text-slate-600">Dr. Mehta</td>
              <td className="py-3.5 text-slate-600">101</td>
              <td className="py-3.5"><span className="text-[#7C9070] font-bold bg-[#7C9070]/10 px-3 py-1 rounded-full text-xs">Done</span></td>
            </tr>
            <tr className="border-b border-slate-50 hover:bg-[#7C9070]/5 transition-colors">
              <td className="py-3.5 text-slate-700 font-medium">09:15</td>
              <td className="py-3.5 text-[#1A3C40] font-bold">Ananya Bose</td>
              <td className="py-3.5 text-slate-600">Dr. Rao</td>
              <td className="py-3.5 text-slate-600">108</td>
              <td className="py-3.5"><span className="text-red-500 font-bold bg-red-50 px-3 py-1 rounded-full text-xs">No-show</span></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-8 shadow-sm">
        <h3 className="font-bold text-[#1A3C40] mb-6">This week at a glance</h3>
        <div className="flex gap-4">
          {['Mon 9', 'Tue 10', 'Wed 11', 'Thu 12', 'Fri 13', 'Sat 14', 'Sun 15'].map((d, i) => (
            <div key={i} className={`flex-1 p-5 rounded-2xl text-center cursor-pointer transition-all ${i === 4 ? 'bg-[#7C9070] text-white shadow-lg scale-105' : i === 1 ? 'bg-red-50 text-red-400' : 'bg-[#EEF2F7] text-slate-500 hover:bg-[#7C9070]/10 hover:text-[#7C9070]'}`}>
              <p className="text-[10px] mb-1 uppercase font-bold tracking-widest">{d.split(' ')[0]}</p>
              <p className="text-2xl font-black">{d.split(' ')[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewSchedule;
