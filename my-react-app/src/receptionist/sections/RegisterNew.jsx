import React from 'react';

const RegisterNew = ({ registerForm, setRegisterForm, handleAddPatient, setCurrentTab }) => {
  return (
    <div className="animate-in fade-in max-w-3xl">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">New patient registration</h2>
      <form onSubmit={handleAddPatient} className="space-y-8 bg-white rounded-xl border border-[#3b82f633] p-8">
        
        <div>
          <h3 className="text-slate-900 font-semibold mb-4 flex items-center justify-between">Personal details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-600 mb-2">First name</label>
              <input 
                required 
                type="text" 
                value={registerForm.firstName} 
                onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} 
                className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Last name</label>
              <input 
                type="text" 
                value={registerForm.lastName} 
                onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} 
                className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Date of birth</label>
              <input 
                type="date" 
                className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" 
              />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Gender</label>
              <select className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500">
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </div>

        <div className="border-t border-[#3b82f633] pt-6">
          <h3 className="text-slate-900 font-semibold mb-4">Contact details</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Mobile number</label>
              <input type="tel" className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Email address</label>
              <input type="email" className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-slate-600 mb-2">Home address</label>
              <input type="text" className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" />
            </div>
          </div>
        </div>

        <div className="border-t border-[#3b82f633] pt-6">
          <h3 className="text-slate-900 font-semibold mb-4">Appointment Info</h3>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-slate-600 mb-2">Assign Doctor</label>
              <select 
                value={registerForm.doctor} 
                onChange={(e) => setRegisterForm({...registerForm, doctor: e.target.value})} 
                className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500"
              >
                <option value="">Select...</option>
                <option value="Dr. Mehta">Dr. Mehta</option>
                <option value="Dr. Singh">Dr. Singh</option>
                <option value="Dr. Patel">Dr. Patel</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-slate-600 mb-2">Time Slot</label>
              <input 
                type="time" 
                value={registerForm.time} 
                onChange={(e) => setRegisterForm({...registerForm, time: e.target.value})} 
                className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none focus:border-blue-500" 
              />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-4">
          <button 
            type="button" 
            onClick={() => setCurrentTab('Overview')} 
            className="px-6 py-2.5 rounded bg-transparent text-slate-900 border border-[#3b82f633] hover:bg-blue-100"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-8 py-2.5 rounded bg-[#4A90E2] text-slate-900 font-medium hover:bg-blue-600"
          >
            Save & Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNew;
