import React from 'react';
import { Stethoscope, Phone } from 'lucide-react';

const LandingPage = ({ onGetStarted }) => {
  return (
    <div className="bg-[#3b82f633] min-h-screen text-[#1A3C40] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7C9070] rounded flex items-center justify-center text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-2xl font-serif text-[#1A3C40]">Green Grove <span className="font-light text-slate-500 text-lg">Family Clinic</span></span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#1A3C40]">
            <a href="#" className="hover:text-[#7C9070] transition-colors">About</a>
            <a href="#" className="hover:text-[#7C9070] transition-colors">Services</a>
            <a href="#" className="hover:text-[#7C9070] transition-colors">Insurance</a>
            <a href="#" className="hover:text-[#7C9070] transition-colors">Contact</a>
            <a href="#" className="hover:text-[#7C9070] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#F9F7F2] rounded-full text-sm font-bold border border-slate-200">
              <Phone size={16} /> Appointments: 123-456-7890
            </div>
            <button 
              onClick={onGetStarted}
              className="bg-[#7C9070] text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-[#6b7d61] transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-block px-4 py-2 bg-transparent border border-[#1A3C40]/20 rounded-full text-[#1A3C40] font-medium text-sm">
              Family Medical Center in San Francisco
            </div>
            <h1 className="text-7xl lg:text-[85px] font-serif font-medium leading-[1.05] text-[#1A3C40]">
              Healthcare <br />focused on you
            </h1>
            <p className="text-xl text-slate-600 max-w-md">
              Experience modern healthcare powered by Green Grove. Efficient, compassionate, and always accessible.
            </p>
            <button 
              onClick={onGetStarted}
              className="bg-[#E7DCAC] text-[#1A3C40] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d8cc9c] transition-all shadow-lg"
            >
              Book an Appointment
            </button>
          </div>
          <div className="relative">
            <div className="rounded-[40px] overflow-hidden shadow-2xl rounded-br-[120px]">
              <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=1000" alt="Doctor and Child" className="w-full h-[600px] object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section (Dark Blue/Teal Theme) */}
      <section className="bg-[#465b6f] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-8">
            Services
          </div>
          <h2 className="text-5xl font-serif mb-16">Your personalized care solutions</h2>
          
          <div className="flex flex-col border-t border-white/20">
            {[
              { id: '01', title: 'Family care', desc: 'Comprehensive health services for all ages.' },
              { id: '02', title: 'Pediatric care', desc: 'Specialized medical attention for children.' },
              { id: '03', title: 'Vaccinations', desc: 'Stay protected with our immunization programs.' },
              { id: '04', title: 'Preventive care', desc: 'Proactive checkups to keep you healthy.' },
              { id: '05', title: 'Acute care', desc: 'Immediate attention for urgent health needs.' },
            ].map((service) => (
              <div key={service.id} className="grid grid-cols-12 py-10 border-b border-white/20 hover:bg-white/5 transition-colors items-center cursor-pointer group">
                <div className="col-span-2 text-xl opacity-50 font-serif">{service.id}</div>
                <div className="col-span-4 text-3xl font-serif group-hover:text-[#E7DCAC] transition-colors">{service.title}</div>
                <div className="col-span-6 text-slate-300 text-lg">{service.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium mb-8">
          What makes us different
        </div>
        <h2 className="text-5xl font-serif mb-16 text-[#1A3C40]">Patient-centered care</h2>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#4A3728] p-12 rounded-[40px] text-white font-serif text-3xl flex items-end h-64">
            Holistic care
          </div>
          <div className="bg-[#D9D9D9] p-12 rounded-[40px] text-[#1A3C40] font-serif text-3xl flex items-end h-64">
            Personalized plans
          </div>
          <div className="bg-[#8C9C92] p-12 rounded-[40px] text-white font-serif text-3xl flex items-end h-64">
            Experienced staff
          </div>
          <div className="bg-[#E5E1DA] p-12 rounded-[40px] text-[#1A3C40] font-serif text-3xl flex items-end h-64">
            Advanced technology
          </div>
          <div className="bg-[#7C9070] p-12 rounded-[40px] text-white font-serif text-3xl flex items-end h-64">
            Family support
          </div>
          <div className="bg-[#F2E8DF] p-12 rounded-[40px] text-[#1A3C40] font-serif text-3xl flex items-end h-64">
            Online appointments
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
