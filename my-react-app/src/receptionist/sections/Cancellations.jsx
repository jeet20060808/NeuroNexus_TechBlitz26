import React from 'react';

const Cancellations = () => {
  return (
    <div className="animate-in fade-in">
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Cancelled today</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">4</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">No-shows today</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">2</h2>
        </div>
        <div className="bg-white p-4 rounded-xl border border-[#3b82f633]">
          <p className="text-slate-600 text-sm mb-1">Slots freed up</p>
          <h2 className="text-3xl text-slate-900 font-semibold mb-1">4</h2>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6 mb-6">
        <h3 className="font-semibold text-slate-900 mb-4">Today's cancellations & no-shows</h3>
        <table className="w-full text-sm text-left">
          <thead className="text-slate-500 border-b border-[#3b82f633]">
            <tr>
              <th className="pb-3 font-medium">Patient</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Reason</th>
              <th className="pb-3 font-medium">Action</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#3b82f633]/50">
              <td className="py-3 text-slate-900">Meena Das</td>
              <td className="py-3 text-slate-600">Dr. Rao</td>
              <td className="py-3 text-slate-600">Personal</td>
              <td className="py-3"><button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded">Reschedule</button></td>
              <td className="py-3"><span className="text-red-500 font-medium bg-red-100/20 px-2 py-1 rounded">Cancelled</span></td>
            </tr>
            <tr>
              <td className="py-3 text-slate-900">Karan Iyer</td>
              <td className="py-3 text-slate-600">Dr. Mehta</td>
              <td className="py-3 text-slate-600">No reason given</td>
              <td className="py-3"><button className="bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded">Follow up</button></td>
              <td className="py-3"><span className="text-red-500 font-medium bg-red-100/20 px-2 py-1 rounded">No-show</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Cancellations;
