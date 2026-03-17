import React from 'react';

const RegisterNew = ({ registerForm, setRegisterForm, handleAddPatient, setCurrentTab, doctors = [] }) => {
  return (
    <div className="animate-in fade-in max-w-3xl">
      <h2 className="text-2xl font-bold text-[#1A3C40] mb-6">New patient registration</h2>
      <form onSubmit={handleAddPatient} className="space-y-8 bg-white rounded-[32px] border border-[#7C9070]/20 p-8 shadow-sm">
        
        <div>
          <h3 className="text-[#1A3C40] font-semibold mb-4 flex items-center justify-between">Personal details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">First name</label>
              <input 
                required 
                type="text" 
                value={registerForm.firstName} 
                onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} 
                className="w-full bg-[#EEF2F7]/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#1A3C40] outline-none focus:border-[#7C9070] transition-colors" 
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">Last name</label>
              <input 
                type="text" 
                value={registerForm.lastName} 
                onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} 
                className="w-full bg-[#EEF2F7]/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#1A3C40] outline-none focus:border-[#7C9070] transition-colors" 
              />
            </div>
          </div>
        </div>

        <div className="border-t border-[#7C9070]/10 pt-6">
          <h3 className="text-[#1A3C40] font-semibold mb-4">Appointment Info</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">Assign Doctor</label>
              <select 
                required
                value={registerForm.doctor} 
                onChange={(e) => setRegisterForm({...registerForm, doctor: e.target.value})} 
                className="w-full bg-[#EEF2F7]/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#1A3C40] outline-none focus:border-[#7C9070] transition-colors"
              >
                <option value="">Select...</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} ({doc.specialization || "General"})</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2 font-medium">Time Slot</label>
              <input 
                required
                type="time" 
                value={registerForm.time} 
                onChange={(e) => setRegisterForm({...registerForm, time: e.target.value})} 
                className="w-full bg-[#EEF2F7]/50 border border-slate-200 rounded-xl px-4 py-2.5 text-[#1A3C40] outline-none focus:border-[#7C9070] transition-colors" 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => setCurrentTab('Overview')} 
            className="px-6 py-2.5 rounded-xl bg-transparent text-[#1A3C40] border border-slate-200 hover:bg-[#EEF2F7] transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-8 py-2.5 rounded-xl bg-[#7C9070] text-white font-bold hover:shadow-lg transition-all"
          >
            Save and Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNew;
