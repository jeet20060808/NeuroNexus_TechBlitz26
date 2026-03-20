import React from 'react';

const RegisterNew = ({ registerForm, setRegisterForm, handleAddPatient, setCurrentTab, doctors = [] }) => {
  return (
    <div className="animate-in fade-in max-w-4xl pb-12">
      <h2 className="text-3xl font-serif text-[#1A3C40] mb-8">Register New Patient</h2>
      
      <form onSubmit={handleAddPatient} className="space-y-10">
        {/* Personal Details Section */}
        <section className="bg-white rounded-[32px] border border-[#7C9070]/20 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-[#7C9070] rounded-full"></div>
            <h3 className="text-lg font-bold text-[#1A3C40]">Personal Information</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">First Name</label>
              <input 
                required 
                type="text" 
                placeholder="John"
                value={registerForm.firstName} 
                onChange={(e) => setRegisterForm({...registerForm, firstName: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Last Name</label>
              <input 
                required
                type="text" 
                placeholder="Doe"
                value={registerForm.lastName} 
                onChange={(e) => setRegisterForm({...registerForm, lastName: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Phone Number</label>
              <input 
                required
                type="tel" 
                placeholder="+91 XXXXX XXXXX"
                value={registerForm.phone} 
                onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                placeholder="john.doe@example.com"
                value={registerForm.email} 
                onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Date of Birth</label>
              <input 
                required
                type="date" 
                value={registerForm.dob} 
                onChange={(e) => setRegisterForm({...registerForm, dob: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Blood Group</label>
              <select 
                value={registerForm.bloodGroup} 
                onChange={(e) => setRegisterForm({...registerForm, bloodGroup: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all"
              >
                <option value="">Select Blood Group</option>
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(bg => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Residential Address</label>
              <textarea 
                rows="2"
                placeholder="123 Street Name, City, Country"
                value={registerForm.address} 
                onChange={(e) => setRegisterForm({...registerForm, address: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all resize-none" 
              />
            </div>
          </div>
        </section>

        {/* Emergency & Appointment Section */}
        <section className="bg-white rounded-[32px] border border-[#7C9070]/20 p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1.5 h-6 bg-[#C49B66] rounded-full"></div>
            <h3 className="text-lg font-bold text-[#1A3C40]">Care Coordination</h3>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div className="col-span-2">
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Emergency Contact Info</label>
              <input 
                type="text" 
                placeholder="Name - Relation - Phone"
                value={registerForm.emergencyContact} 
                onChange={(e) => setRegisterForm({...registerForm, emergencyContact: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Assign Primary Doctor</label>
              <select 
                required
                value={registerForm.doctor} 
                onChange={(e) => setRegisterForm({...registerForm, doctor: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all"
              >
                <option value="">Choose a Doctor</option>
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>{doc.name} • {doc.specialization}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-black text-[#7C9070] uppercase tracking-widest mb-2">Initial Appointment Time</label>
              <input 
                required
                type="time" 
                value={registerForm.time} 
                onChange={(e) => setRegisterForm({...registerForm, time: e.target.value})} 
                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-3 text-[#1A3C40] focus:ring-4 focus:ring-[#7C9070]/5 outline-none focus:border-[#7C9070] transition-all" 
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-6">
          <button 
            type="button" 
            onClick={() => setCurrentTab('Overview')} 
            className="px-10 py-4 rounded-2xl text-slate-500 font-bold hover:bg-slate-100 transition-all"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-12 py-4 rounded-2xl bg-[#1A3C40] text-white font-bold hover:shadow-xl active:scale-95 transition-all shadow-lg shadow-[#1A3C40]/20"
          >
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterNew;
