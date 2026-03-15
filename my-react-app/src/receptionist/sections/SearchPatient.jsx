import React from 'react';
import { Trash2 } from 'lucide-react';

const SearchPatient = ({ patients, handleDeletePatient }) => {
  return (
    <div className="animate-in fade-in">
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-6 mb-6 shadow-sm">
        <h3 className="text-lg font-bold text-[#1A3C40] mb-4">Search patient</h3>
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <input type="text" placeholder="Name, patient ID, phone, or email..." className="w-full bg-[#EEF2F7]/50 border border-slate-200 rounded-2xl pl-4 pr-4 py-3 text-[#1A3C40] outline-none focus:border-[#7C9070] transition-colors" />
          </div>
          <button className="bg-[#7C9070] hover:shadow-lg text-white px-8 py-3 rounded-2xl font-bold transition-all">Search</button>
        </div>
        <div className="flex gap-2 text-sm text-slate-600 mb-4 items-center font-medium">
          Filter by: 
          <span className="bg-[#7C9070]/10 text-[#7C9070] px-4 py-1.5 rounded-full cursor-pointer font-bold">All</span>
          <span className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-[#EEF2F7] transition-colors">Active</span>
          <span className="px-4 py-1.5 rounded-full cursor-pointer hover:bg-[#EEF2F7] transition-colors">Inactive</span>
        </div>

        <table className="w-full text-left text-sm mt-4">
          <thead className="text-slate-500 border-b border-[#7C9070]/10">
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
                <tr key={p.id} className="border-b border-slate-50 hover:bg-[#7C9070]/5 cursor-pointer transition-colors">
                  <td className="py-4 text-slate-600 font-medium">{p.id}</td>
                  <td className="py-4 text-[#1A3C40] font-bold">{p.name}</td>
                  <td className="py-4 text-slate-700">{p.age || 'N/A'}</td>
                  <td className="py-4 text-slate-600">{p.phone}</td>
                  <td className="py-4 text-slate-600 font-medium">{p.doctor || 'Unassigned'}</td>
                  <td className="py-4"><span className="text-[#7C9070] font-bold">{p.status || 'Active'}</span></td>
                  <td className="py-4 text-right">
                    <button onClick={() => handleDeletePatient(p.id)} className="text-slate-400 hover:text-red-500 transition-colors">
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
        <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-8 shadow-sm animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#1A3C40]">Quick patient card — {patients[patients.length-1].name}</h3>
            <span className="bg-[#7C9070]/10 text-[#7C9070] text-xs px-3 py-1.5 rounded-xl font-bold tracking-wider">{patients[patients.length-1].id}</span>
          </div>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div><p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-tighter">Date of birth</p><p className="bg-[#EEF2F7]/50 border border-slate-100 rounded-xl px-4 py-2.5 text-[#1A3C40] font-medium">14 Aug 1987 • 38 yrs • M</p></div>
            <div><p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-tighter">Primary doctor</p><p className="bg-[#EEF2F7]/50 border border-slate-100 rounded-xl px-4 py-2.5 text-[#1A3C40] font-medium">{patients[patients.length-1].doctor || 'Unassigned'}</p></div>
            <div><p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-tighter">Phone / email</p><p className="bg-[#EEF2F7]/50 border border-slate-100 rounded-xl px-4 py-2.5 text-[#1A3C40] font-medium">{patients[patients.length-1].phone}</p></div>
            <div><p className="text-slate-500 text-xs mb-2 font-medium uppercase tracking-tighter">Emergency Contact</p><p className="bg-[#EEF2F7]/50 border border-slate-100 rounded-xl px-4 py-2.5 text-[#1A3C40] font-medium">Wife • +91 98200 99999</p></div>
          </div>
          <div className="flex gap-4">
            <button className="bg-transparent border border-slate-200 text-[#1A3C40] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#EEF2F7] transition-all">View full record</button>
            <button className="bg-[#7C9070] text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:shadow-lg transition-all">Book appointment</button>
            <button className="bg-transparent border border-slate-200 text-[#1A3C40] px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-[#EEF2F7] transition-all">Edit details</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
