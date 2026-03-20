import React, { useState } from 'react';
import { Trash2, Search as SearchIcon, User, Phone, MapPin, Heart, AlertCircle, Calendar } from 'lucide-react';

const SearchPatient = ({ patients, handleDeletePatient }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const filteredPatients = patients.filter(p => {
    const fullName = `${p.first_name || ''} ${p.last_name || ''}`.toLowerCase();
    const phone = (p.phone || '').toLowerCase();
    const email = (p.email || '').toLowerCase();
    const id = (p.id || '').toLowerCase();
    const term = searchTerm.toLowerCase();
    return fullName.includes(term) || phone.includes(term) || email.includes(term) || id.includes(term);
  });

  const activePatient = selectedPatientId 
    ? patients.find(p => p.id === selectedPatientId) 
    : (filteredPatients.length > 0 ? filteredPatients[0] : null);

  return (
    <div className="animate-in fade-in space-y-8">
      <div className="bg-white rounded-[40px] border border-[#7C9070]/20 p-10 shadow-sm">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h3 className="text-2xl font-serif text-[#1A3C40] mb-1">Patient Directory</h3>
                <p className="text-[#7C9070] text-xs font-black uppercase tracking-widest">Global clinic records</p>
            </div>
            <div className="flex gap-2">
                <span className="bg-[#7C9070]/10 text-[#7C9070] text-[10px] font-black px-4 py-1.5 rounded-full uppercase">
                    {patients.length} Registered
                </span>
            </div>
        </div>

        <div className="relative mb-10">
          <SearchIcon className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7C9070]" size={20} />
          <input 
            type="text" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, ID, phone or email..." 
            className="w-full bg-slate-50/50 border border-slate-100 rounded-[28px] pl-16 pr-8 py-5 text-[#1A3C40] text-base outline-none focus:border-[#7C9070] focus:ring-8 focus:ring-[#7C9070]/5 transition-all shadow-inner" 
          />
        </div>

        <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[#7C9070] border-b border-[#7C9070]/10">
                <tr>
                  <th className="px-6 pb-4 font-black uppercase text-[10px] tracking-widest">Patient Name</th>
                  <th className="px-6 pb-4 font-black uppercase text-[10px] tracking-widest">Contact Info</th>
                  <th className="px-6 pb-4 font-black uppercase text-[10px] tracking-widest">ID</th>
                  <th className="px-6 pb-4 font-black uppercase text-[10px] tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPatients.length === 0 ? (
                  <tr><td colSpan="4" className="py-20 text-center text-slate-400 italic">No clinical records match your search.</td></tr>
                ) : (
                  filteredPatients.map((p) => (
                    <tr 
                        key={p.id} 
                        onClick={() => setSelectedPatientId(p.id)}
                        className={`hover:bg-[#7C9070]/5 cursor-pointer transition-all group ${selectedPatientId === p.id ? 'bg-[#7C9070]/10' : ''}`}
                    >
                      <td className="px-6 py-5">
                          <p className="text-[#1A3C40] font-bold text-base group-hover:translate-x-1 transition-transform">{p.first_name} {p.last_name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{p.dob || 'DOB unknown'}</p>
                      </td>
                      <td className="px-6 py-5">
                          <p className="text-[#1A3C40] font-medium">{p.phone}</p>
                          <p className="text-xs text-slate-500">{p.email || 'No email'}</p>
                      </td>
                      <td className="px-6 py-5">
                          <span className="text-[10px] font-black text-[#7C9070] uppercase bg-[#7C9070]/5 px-2 py-1 rounded border border-[#7C9070]/10">{p.id.split('-')[0]}</span>
                      </td>
                      <td className="px-6 py-5 text-right">
                        <button 
                            onClick={(e) => { e.stopPropagation(); handleDeletePatient(p.id); }} 
                            className="bg-red-50 text-red-400 hover:bg-red-500 hover:text-white p-3 rounded-2xl transition-all shadow-sm"
                        >
                          <Trash2 size={18}/>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
        </div>
      </div>

      {/* QUICK PATIENT CARD */}
      {activePatient && (
        <div className="bg-slate-900 rounded-[48px] p-10 text-white shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 group-hover:scale-110 transition-transform duration-700">
                <User size={200} />
            </div>
            
            <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                   <div className="flex items-center gap-6">
                        <div className="w-20 h-20 rounded-[32px] bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl font-black text-[#7C9070] border border-white/5">
                            {activePatient.first_name?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-4xl font-serif mb-2">{activePatient.first_name} {activePatient.last_name}</h3>
                            <div className="flex gap-4">
                                <span className="bg-white/5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest text-[#7C9070]">Official Clinical File</span>
                                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">ID: {activePatient.id}</span>
                            </div>
                        </div>
                   </div>
                   <div className="text-right">
                        <div className="bg-white/5 p-4 rounded-3xl border border-white/5">
                            <p className="text-[10px] text-slate-500 font-black uppercase mb-1">Clinic Center</p>
                            <p className="text-sm font-bold">NeuroNexus Premier Clinic</p>
                        </div>
                   </div>
                </div>

                <div className="grid grid-cols-4 gap-8 mb-12">
                    <div className="space-y-2">
                        <p className="flex items-center gap-2 text-[10px] text-[#7C9070] font-black uppercase tracking-widest">
                            <Calendar size={12} /> Date of Birth
                        </p>
                        <p className="text-lg font-bold">{activePatient.dob || '—'}</p>
                    </div>
                    <div className="space-y-2">
                        <p className="flex items-center gap-2 text-[10px] text-[#7C9070] font-black uppercase tracking-widest">
                            <Heart size={12} /> Blood Group
                        </p>
                        <p className="text-lg font-bold text-red-400 capitalize">{activePatient.blood_group || 'Unknown'}</p>
                    </div>
                    <div className="space-y-2 col-span-2">
                        <p className="flex items-center gap-2 text-[10px] text-[#7C9070] font-black uppercase tracking-widest">
                            <MapPin size={12} /> Registered Address
                        </p>
                        <p className="text-lg font-medium text-slate-300 leading-tight">{activePatient.address || 'No residential address on file.'}</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-12">
                    <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                        <p className="flex items-center gap-2 text-[10px] text-orange-400 font-black uppercase tracking-widest mb-3">
                            <AlertCircle size={14} /> Emergency Guardian
                        </p>
                        <p className="text-base font-bold text-slate-200">{activePatient.emergency_contact || 'None registered'}</p>
                    </div>
                    <div className="bg-white/5 p-6 rounded-[32px] border border-white/5">
                        <p className="flex items-center gap-2 text-[10px] text-[#7C9070] font-black uppercase tracking-widest mb-3">
                            <Phone size={14} /> Primary Contact
                        </p>
                        <p className="text-base font-bold text-slate-200">{activePatient.phone}</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">{activePatient.email || 'No email registered'}</p>
                    </div>
                </div>

                <div className="flex gap-4">
                    <button className="flex-1 bg-white text-slate-900 py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-[#7C9070] hover:text-white transition-all shadow-xl">
                        Schedule Consultation
                    </button>
                    <button className="flex-1 bg-white/5 border border-white/10 text-white py-5 rounded-[24px] font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                        Update Credentials
                    </button>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};

export default SearchPatient;
