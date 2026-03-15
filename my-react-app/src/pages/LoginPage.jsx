import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, ArrowLeft, Stethoscope, Upload, Calendar } from 'lucide-react';

const LoginPage = ({ onLogin, onBack }) => {
  const [role, setRole] = useState('receptionist'); 
  const [mode, setMode] = useState('signin'); // 'signin' | 'signup'
  const [selectedDays, setSelectedDays] = useState(['Mon', 'Wed', 'Fri']);
  
  const toggleDay = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ 
      id: role === 'receptionist' ? 'RE-101' : 'DOC-202', 
      name: role === 'receptionist' ? 'Sarah Roberts' : 'Dr. Vikram Shah',
      role: role 
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans flex items-center justify-center p-4 lg:p-6 pb-20 overflow-x-hidden">
      <style>{`
        .sliding-panel {
          transition: transform 0.9s cubic-bezier(0.86, 0, 0.07, 1);
          backface-visibility: hidden;
          perspective: 1000px;
        }
        @media (min-width: 1024px) {
          .panel-left.is-doctor { transform: translate3d(100%, 0, 0); }
          .panel-right.is-doctor { transform: translate3d(-100%, 0, 0); }
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <div className="relative w-full max-w-6xl h-auto min-h-[750px] lg:h-[85vh] bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col lg:block shadow-[#1A3C40]/10">
        
        {/* PANEL 1: IMAGE & BRANDING (Left by default) */}
        <div className={`sliding-panel panel-left relative lg:absolute top-0 lg:left-0 w-full lg:w-1/2 h-48 lg:h-full z-10 bg-[#1A3C40] text-white flex flex-col justify-between p-8 lg:p-12 ${role === 'doctor' ? 'is-doctor' : ''}`}>
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-40">
            <img 
              src={role === 'doctor' ? "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=1200&auto=format&fit=crop" : "/assets/clinic_interior.png"} 
              alt="Healthcare Environment" 
              className="w-full h-full object-cover transition-opacity duration-1000"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A3C40]/40 lg:from-[#1A3C40]/20 to-[#1A3C40]/95 z-0"></div>
          
          <div className="relative z-10 hidden lg:block">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 bg-[#E7DCAC] rounded-xl flex items-center justify-center text-[#1A3C40]">
                  <Stethoscope size={24} />
               </div>
               <span className="text-2xl font-serif">Healio</span>
            </div>
          </div>

          <div className="relative z-10 flex-1 flex flex-col justify-end lg:justify-center mt-6 lg:mt-0">
             <h2 className="text-3xl lg:text-5xl font-serif mb-3 lg:mb-6 leading-[1.15]">
               {role === 'receptionist' 
                 ? "Manage your clinic efficiently." 
                 : "Provide exceptional care."}
             </h2>
             <p className="text-[#E7DCAC] text-sm lg:text-lg max-w-sm font-medium opacity-90">
               {role === 'receptionist' 
                 ? "The central hub for appointments, patient records, and daily operations." 
                 : "Join our network of elite healthcare professionals."}
             </p>
          </div>
        </div>

        {/* PANEL 2: FORM (Right by default) */}
        <div className={`sliding-panel panel-right relative lg:absolute top-0 lg:right-0 w-full lg:w-1/2 h-auto lg:h-full z-20 bg-white rounded-[40px] lg:rounded-none flex flex-col ${role === 'doctor' ? 'is-doctor' : ''} -mt-6 lg:mt-0`}>
          
          {/* Top Bar with Back Button & Tabs */}
          <div className="px-6 lg:px-16 pt-8 pb-4 border-b border-slate-100 bg-white/95 backdrop-blur-md z-30 sticky top-0 rounded-t-[40px] lg:rounded-none">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-400 hover:text-[#1A3C40] transition-colors text-[11px] font-bold uppercase tracking-wider mb-5 group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
            
            {/* Mode Tabs */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl mb-5">
              <button 
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'signin' ? 'bg-white text-[#1A3C40] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Sign In
              </button>
              <button 
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-sm font-bold transition-all ${mode === 'signup' ? 'bg-white text-[#1A3C40] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Create Account
              </button>
            </div>

            {/* Role Switcher */}
            <div className="flex bg-[#F9F7F2] p-1.5 rounded-2xl border border-slate-200/60">
              <button 
                type="button"
                onClick={() => setRole('receptionist')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${role === 'receptionist' ? 'bg-[#1A3C40] text-white shadow-md' : 'text-slate-500 hover:text-[#1A3C40]'}`}
              >
                <User size={14} /> Receptionist
              </button>
              <button 
                type="button"
                onClick={() => setRole('doctor')}
                className={`flex-1 py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${role === 'doctor' ? 'bg-[#7C9070] text-white shadow-md' : 'text-slate-500 hover:text-[#7C9070]'}`}
              >
                <Stethoscope size={14} /> Doctor
              </button>
            </div>
          </div>

          {/* Form Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto hide-scrollbar px-6 lg:px-16 py-8">
            <form className="space-y-6" onSubmit={handleSubmit}>
              
              {mode === 'signin' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-8">
                     <h3 className="text-3xl font-serif text-[#1A3C40] mb-2">Welcome back</h3>
                     <p className="text-slate-500 text-sm">Enter your {role} credentials to access your dashboard.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Professional Email</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        required
                        placeholder="name@clinic.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="password" 
                        required
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 pl-12 pr-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs pt-1">
                    <label className="flex items-center gap-2 font-medium text-slate-600 cursor-pointer">
                      <input type="checkbox" className="w-3.5 h-3.5 rounded text-[#7C9070] focus:ring-[#7C9070] border-slate-300" /> Remember me
                    </label>
                    <a href="#" className="font-bold text-[#7C9070] hover:underline">Forgot password?</a>
                  </div>
                </div>
              )}

              {mode === 'signup' && role === 'receptionist' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6">
                     <h3 className="text-3xl font-serif text-[#1A3C40] mb-2">Create Clinic</h3>
                     <p className="text-slate-500 text-sm">Set up your clinic workspace. Doctors will join using your exact clinic name.</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                      <input type="text" required placeholder="Jane Doe" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Designation</label>
                      <input type="text" required placeholder="Head Receptionist" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#1A3C40]">Clinic Name (Shared Key)</label>
                    <input type="text" required placeholder="Green Grove Medical" className="w-full bg-slate-50 border border-[#1A3C40]/30 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#1A3C40] focus:ring-1 focus:ring-[#1A3C40] transition-all font-medium text-[#1A3C40]" />
                    <p className="text-[11px] text-slate-400">Make sure doctors know this exact name to join your workspace.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</label>
                      <input type="email" required placeholder="jane@clinic.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
                      <input type="tel" required placeholder="(555) 123-4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                  </div>
                </div>
              )}

              {mode === 'signup' && role === 'doctor' && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="mb-6">
                     <h3 className="text-3xl font-serif text-[#1A3C40] mb-2">Join Clinic</h3>
                     <p className="text-slate-500 text-sm">Create your specialist profile and link it to your clinic workspace.</p>
                  </div>
                  
                  <div className="border-2 border-dashed border-slate-200 rounded-2xl p-5 flex flex-col items-center justify-center text-center hover:border-[#7C9070] hover:bg-[#7C9070]/5 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-slate-100 group-hover:bg-white rounded-full flex items-center justify-center text-slate-400 group-hover:text-[#7C9070] transition-colors mb-2 shadow-sm">
                      <Upload size={18} />
                    </div>
                    <p className="text-sm font-bold text-[#1A3C40] mb-0.5">Upload Profile Photo</p>
                    <p className="text-[11px] text-slate-400">SVG, PNG, JPG (max 2MB)</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Full Name</label>
                      <input type="text" required placeholder="Dr. John Smith" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">License Number</label>
                      <input type="text" required placeholder="MD-12345" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Specialization</label>
                     <select required className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] text-slate-700 transition-all cursor-pointer bg-no-repeat bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M6%209L12%2015L18%209%22%20stroke%3D%22%2364748B%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[position:calc(100%-1rem)_center] appearance-none">
                        <option value="">Select specialization...</option>
                        <option value="general">General Practice</option>
                        <option value="cardiology">Cardiology</option>
                        <option value="dermatology">Dermatology</option>
                        <option value="pediatrics">Pediatrics</option>
                        <option value="orthopedics">Orthopedics</option>
                     </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-[#7C9070]">Clinic Name (Must match exactly)</label>
                    <input type="text" required placeholder="e.g. Green Grove Medical" className="w-full bg-slate-50 border border-[#7C9070]/40 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all text-[#1A3C40] font-bold" />
                  </div>

                  <div className="space-y-3 pt-2">
                     <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5"><Calendar size={14}/> Availability</label>
                     <div className="flex flex-wrap gap-2 mb-3">
                        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                           <div 
                              key={day}
                              onClick={() => toggleDay(day)}
                              className={`px-3.5 py-1.5 text-xs font-bold rounded-lg cursor-pointer transition-all border ${selectedDays.includes(day) ? 'bg-[#7C9070] text-white border-[#7C9070] shadow-sm' : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'}`}
                           >
                              {day}
                           </div>
                        ))}
                     </div>
                     <div className="flex items-center gap-3">
                        <input type="time" required className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#7C9070] font-medium text-slate-600" defaultValue="09:00" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">to</span>
                        <input type="time" required className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-4 text-sm outline-none focus:border-[#7C9070] font-medium text-slate-600" defaultValue="17:00" />
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Email</label>
                      <input type="email" required placeholder="name@clinic.com" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Phone</label>
                      <input type="tel" required placeholder="(555) 123-4567" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500">Password</label>
                    <input type="password" required placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] focus:ring-1 focus:ring-[#7C9070] transition-all" />
                  </div>
                </div>
              )}

              <div className="pt-6 pb-2">
                <button 
                  type="submit" 
                  className={`w-full text-white py-4 mt-2 rounded-xl font-bold flex items-center justify-center gap-2 transition-all transform active:scale-[0.98] shadow-xl ${role === 'receptionist' ? 'bg-[#1A3C40] hover:bg-[#142e31] shadow-[#1A3C40]/20' : 'bg-[#7C9070] hover:bg-[#6b7d61] shadow-[#7C9070]/20'}`}
                >
                  {mode === 'signin' ? 'Sign In to Dashboard' : 'Create Account'} <ArrowRight size={18} />
                </button>
                {mode === 'signup' && (
                  <p className="text-[11px] text-center text-slate-400 mt-5 leading-relaxed">
                    By creating an account, you agree to Healio's <a href="#" className="font-bold underline hover:text-[#1A3C40]">Terms of Service</a> and <a href="#" className="font-bold underline hover:text-[#1A3C40]">Privacy Policy</a>.
                  </p>
                )}
              </div>

            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default LoginPage;
