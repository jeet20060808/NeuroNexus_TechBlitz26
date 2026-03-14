import React from 'react';
import { Trash2 } from 'lucide-react';

const SearchPatient = ({ patients, handleDeletePatient }) => {
  return (
    <div className="animate-in fade-in">
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6 mb-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Search patient</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input type="text" placeholder="Name, patient ID, phone, or email..." className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded-lg pl-4 pr-4 py-3 text-slate-900 outline-none focus:border-blue-500" />
          </div>
          <button className="bg-blue-100 hover:bg-[#444444] text-slate-900 px-8 py-3 rounded-lg font-medium transition-colors">Search</button>
        </div>
        <div className="flex gap-2 text-sm text-slate-600 mb-4 items-center">
          Filter by: 
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full cursor-pointer">All</span>
          <span className="px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100">Active</span>
          <span className="px-3 py-1 rounded-full cursor-pointer hover:bg-blue-100">Inactive</span>
        </div>

        <table className="w-full text-left text-sm mt-4">
          <thead className="text-slate-500 border-b border-[#3b82f633]">
            <tr>
              <th className="pb-3 font-medium">Patient ID</th>
              <th className="pb-3 font-medium">Name</th>
              <th className="pb-3 font-medium">Age</th>
              <th className="pb-3 font-medium">Phone</th>
              <th className="pb-3 font-medium">Doctor</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 font-medium text-right">Delete</th>
            </tr>
          </thead>
          <tbody>
            {!patients || patients.length === 0 ? (
              <tr><td colSpan="7" className="py-8 text-center text-slate-500">No patients found.</td></tr>
            ) : (
              patients.map((p) => (
                <tr key={p.id} className="border-b border-[#3b82f633]/50 hover:bg-blue-100/30 cursor-pointer">
                  <td className="py-4 text-slate-600">{p.id}</td>
                  <td className="py-4 text-slate-900 font-medium">{p.name}</td>
                  <td className="py-4 text-slate-700">{p.age || 'N/A'}</td>
                  <td className="py-4 text-slate-600">{p.phone}</td>
                  <td className="py-4 text-slate-600">{p.doctor || 'Unassigned'}</td>
                  <td className="py-4"><span className="text-green-400 font-medium">{p.status || 'Active'}</span></td>
                  <td className="py-4 text-right">
                    <button onClick={() => handleDeletePatient(p.id)} className="text-slate-500 hover:text-red-400">
                      <Trash2 size={16}/>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* QUICK PATIENT CARD */}
      {patients && patients.length > 0 && (
        <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-900">Quick patient card — {patients[patients.length-1].name}</h3>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">{patients[patients.length-1].id}</span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div><p className="text-slate-500 text-xs mb-1">Date of birth</p><p className="bg-[#3b82f633] border border-[#3b82f633] rounded px-3 py-2 text-slate-900">14 Aug 1987 • 38 yrs • M</p></div>
            <div><p className="text-slate-500 text-xs mb-1">Primary doctor</p><p className="bg-[#3b82f633] border border-[#3b82f633] rounded px-3 py-2 text-slate-900">{patients[patients.length-1].doctor || 'Unassigned'}</p></div>
            <div><p className="text-slate-500 text-xs mb-1">Phone / email</p><p className="bg-[#3b82f633] border border-[#3b82f633] rounded px-3 py-2 text-slate-900">{patients[patients.length-1].phone}</p></div>
            <div><p className="text-slate-500 text-xs mb-1">Emergency Contact</p><p className="bg-[#3b82f633] border border-[#3b82f633] rounded px-3 py-2 text-slate-900">Wife • +91 98200 99999</p></div>
          </div>
          <div className="flex gap-3">
            <button className="bg-transparent border border-[#555] text-slate-900 px-4 py-2 rounded text-sm hover:bg-[#333]">View full record</button>
            <button className="bg-[#333] border border-[#555] text-slate-900 px-4 py-2 rounded text-sm hover:bg-[#444]">Book appointment</button>
            <button className="bg-transparent border border-[#555] text-slate-900 px-4 py-2 rounded text-sm hover:bg-[#333]">Edit details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
