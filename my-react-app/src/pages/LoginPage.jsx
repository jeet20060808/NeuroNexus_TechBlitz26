import React, { useState } from 'react';
import { Mail, Lock, User, ArrowRight, Stethoscope } from 'lucide-react';

const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('receptionist'); 
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ 
      id: role === 'receptionist' ? 'RE-101' : 'DOC-202', 
      name: role === 'receptionist' ? 'Sarah Roberts' : 'Dr. Vikram Shah',
      role: role 
    });
  };

  return (
    <div className="min-h-screen bg-[#EEF2F7] font-sans flex items-center justify-center p-6 pb-20">
      
      <div className="w-full max-w-7xl grid lg:grid-cols-2 gap-12 items-center bg-white rounded-[40px] shadow-xl overflow-hidden min-h-[700px]">
        
        {/* Left: Branding & Visual */}
        <div className="bg-[#465b6f] text-white h-full hidden lg:flex flex-col relative overflow-hidden">
          {/* Background Image Overlay */}
          <div className="absolute inset-0 opacity-40">
            <img 
              src="/assets/login_visual.png" 
              alt="Healthcare Environment" 
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="relative z-10 p-16 h-full flex flex-col justify-between">
            <div className="flex items-center gap-3">
               <div className="w-8 h-8 bg-[#E7DCAC] rounded flex items-center justify-center text-[#465b6f]">
                  <Stethoscope size={20} />
               </div>
               <span className="text-xl font-serif">Healio</span>
            </div>

            <div>
               <h2 className="text-6xl font-serif mb-8 leading-tight">Your gateway to better healthcare management.</h2>
               <p className="text-slate-300 text-lg max-w-sm">Join our network of healthcare professionals providing exceptional care.</p>
            </div>

            <div className="flex gap-4">
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                  <span className="text-xs">FB</span>
               </div>
               <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center border border-white/20 hover:bg-white/20 transition-all cursor-pointer">
                  <span className="text-xs">TW</span>
               </div>
            </div>
          </div>
        </div>

        {/* Right: Login Form */}
        <div className="p-8 lg:p-24 space-y-10">
          <div>
            <h1 className="text-5xl font-serif text-[#1A3C40] mb-4">Welcome back</h1>
            <p className="text-slate-500">Sign in to manage your clinic dashboard.</p>
          </div>

          {/* Role Switcher */}
          <div className="flex bg-slate-100 p-1.5 rounded-full">
            <button 
              onClick={() => setRole('receptionist')}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'receptionist' ? 'bg-white text-[#1A3C40] shadow-sm' : 'text-slate-500'}`}
            >
              <User size={16} /> Receptionist
            </button>
            <button 
              onClick={() => setRole('doctor')}
              className={`flex-1 py-3 px-6 rounded-full text-sm font-bold flex items-center justify-center gap-2 transition-all ${role === 'doctor' ? 'bg-white text-[#1A3C40] shadow-sm' : 'text-slate-500'}`}
            >
              <Stethoscope size={16} /> Doctor
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Professional Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="email" 
                  required
                  placeholder="name@healio.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#7C9070] transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Security Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-[#7C9070] transition-colors"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 font-medium text-[#1A3C40] cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded accent-[#7C9070]" /> Remember for 30 days
              </label>
              <a href="#" className="font-bold text-[#7C9070] hover:underline">Forgot security code?</a>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1A3C40] text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-[#142e31] transition-all transform active:scale-[0.98] shadow-lg"
            >
              Enter Dashboard <ArrowRight size={20} />
            </button>
          </form>

          <div className="text-center">
            <p className="text-slate-400 text-sm">Facing issues signing in? <a href="#" className="text-[#1A3C40] font-bold underline">Contact IT Support</a></p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default LoginPage;
