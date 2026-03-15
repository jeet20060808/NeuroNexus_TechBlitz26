import React, { useEffect, useRef } from 'react';
import { Stethoscope, Phone, MapPin, Mail, Clock, ChevronDown, Shield, Star, Users, Heart } from 'lucide-react';

// ── Scroll animation hook ──────────────────────────────────────────
const useScrollAnimation = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -50px 0px' }
    );
    
    const timeout = setTimeout(() => {
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timeout);
      observer.disconnect();
    };
  }, []);
};

const LandingPage = ({ onGetStarted }) => {
  useScrollAnimation();

  return (
    <>
      <style>{`
        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-animate.is-visible {
          opacity: 1;
          transform: translateY(0);
        }
        .scroll-animate-left {
          opacity: 0;
          transform: translateX(-40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-animate-left.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .scroll-animate-right {
          opacity: 0;
          transform: translateX(40px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .scroll-animate-right.is-visible {
          opacity: 1;
          transform: translateX(0);
        }
        .delay-100 { transition-delay: 0.1s; }
        .delay-200 { transition-delay: 0.2s; }
        .delay-300 { transition-delay: 0.3s; }
        .delay-400 { transition-delay: 0.4s; }
        .delay-500 { transition-delay: 0.5s; }
        .delay-600 { transition-delay: 0.6s; }
        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.4s ease, padding 0.3s ease;
        }
        .faq-answer.open {
          max-height: 200px;
        }
        .service-row:hover .service-arrow {
          transform: translateX(6px);
          opacity: 1;
        }
        .service-arrow {
          transform: translateX(-4px);
          opacity: 0;
          transition: all 0.3s ease;
        }
        .card-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-6px);
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .float-anim { animation: float 4s ease-in-out infinite; }
      `}</style>

    <div className="bg-[#79a8f566] min-h-screen text-[#1A3C40] font-sans">

      {/* ── NAVIGATION ── */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#7C9070] rounded flex items-center justify-center text-white">
              <Stethoscope size={24} />
            </div>
            <span className="text-2xl font-serif text-[#1A3C40]">Healio <span className="font-light text-slate-500 text-lg">Medical Center</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-[#1A3C40]">
            <a href="#about" className="hover:text-[#7C9070] transition-colors">About</a>
            <a href="#services" className="hover:text-[#7C9070] transition-colors">Services</a>
            <a href="#insurance" className="hover:text-[#7C9070] transition-colors">Insurance</a>
            <a href="#contact" className="hover:text-[#7C9070] transition-colors">Contact</a>
            <a href="#faq" className="hover:text-[#7C9070] transition-colors">FAQ</a>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-2 px-4 py-2 bg-[#F9F7F2] rounded-full text-sm font-bold border border-slate-200">
              <Phone size={16} /> Appointments: 123-456-7890
            </div>
            <button
              onClick={onGetStarted}
              className="bg-[#7C9070] text-white px-4 py-2.5 rounded-full font-bold text-sm hover:bg-[#6b7d61] transition-all border border-transparent hover:border-slate-200"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="scroll-animate inline-block px-4 py-2 bg-[#E7DCAC] border-[#1A3C40]/20 rounded-full text-[#1A3C40] font-medium text-sm">
              Family Medical Center in San Francisco
            </div>
            <h1 className="scroll-animate delay-100 text-7xl lg:text-[85px] font-serif font-medium leading-[1.05] text-[#1A3C40]">
              Healthcare <br />focused on you
            </h1>
            <p className="scroll-animate delay-200 text-xl text-slate-600 max-w-md">
              Experience modern healthcare powered by Green Grove. Efficient, compassionate, and always accessible.
            </p>
            <div className="scroll-animate delay-300 flex gap-4">
              <button
                onClick={onGetStarted}
                className="bg-[#E7DCAC] text-[#1A3C40] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d8cc9c] transition-all shadow-lg"
              >
                Book an Appointment
              </button>
              <a href="#about" className="flex items-center gap-2 px-8 py-4 rounded-full font-bold text-lg hover:bg-[#d8cc9c] transition-all shadow-lg bg-[#E7DCAC] border-[#1A3C40]/20">
                Learn more
              </a>
            </div>
          </div>
          <div className="relative scroll-animate-right delay-200">
            <div className="rounded-[40px] overflow-hidden shadow-2xl rounded-br-[120px]">
            <img
              src="/assets/hero_green_grove.png"
              alt="Green Grove Clinic"
              className="w-full h-[600px] object-cover"
            />           
            </div>
            {/* Floating stat cards */}
            <div className="float-anim absolute -left-8 top-1/3 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-xs text-slate-400 mb-1">Patients served</p>
              <p className="text-2xl font-serif font-semibold text-[#1A3C40]">12,400+</p>
            </div>
            <div className="float-anim absolute -right-4 bottom-1/4 bg-white rounded-2xl px-5 py-4 shadow-xl" style={{animationDelay:'1.5s'}}>
              <p className="text-xs text-slate-400 mb-1">Satisfaction rate</p>
              <p className="text-2xl font-serif font-semibold text-[#7C9070]">98%</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-[#1A3C40] py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '25+', label: 'Years of service' },
            { value: '12,400+', label: 'Patients served' },
            { value: '40+', label: 'Specialists' },
            { value: '98%', label: 'Satisfaction rate' },
          ].map((s, i) => (
            <div key={i} className={`scroll-animate delay-${i * 100 + 100}`}>
              <p className="text-4xl font-serif text-[#E7DCAC] mb-1">{s.value}</p>
              <p className="text-slate-400 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="scroll-animate-left relative">
            <div className="rounded-[40px] overflow-hidden shadow-xl">
              <img
                src="/assets/interior_premium.png"
                alt="Clinic Interior"
                className="w-full h-[600px] object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 bg-[#7C9070] text-white rounded-3xl p-6 shadow-xl w-48">
              <p className="text-3xl font-serif font-bold mb-1">25+</p>
              <p className="text-sm opacity-80">Years caring for families</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium">
              About us
            </div>
            <h2 className="scroll-animate delay-100 text-5xl font-serif text-[#1A3C40]">
              A clinic built on trust and compassion
            </h2>
            <p className="scroll-animate delay-200 text-slate-600 text-lg leading-relaxed">
              Healio Medical Center has been San Francisco's trusted healthcare partner since 1999. We combine modern medicine with a personal touch — treating every patient as family.
            </p>
            <p className="scroll-animate delay-300 text-slate-600 text-lg leading-relaxed">
              Our multidisciplinary team of over 40 specialists work together to deliver comprehensive, compassionate care at every stage of life.
            </p>
            <div className="scroll-animate delay-400 grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: <Heart size={20} />, label: 'Compassionate care' },
                { icon: <Users size={20} />, label: 'Family-focused' },
                { icon: <Star size={20} />, label: 'Top-rated doctors' },
                { icon: <Shield size={20} />, label: 'Trusted & certified' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 bg-white rounded-2xl px-4 py-3 shadow-sm border border-slate-100">
                  <div className="w-8 h-8 bg-[#7C9070]/10 text-[#7C9070] rounded-lg flex items-center justify-center">{item.icon}</div>
                  <span className="text-sm font-medium text-[#1A3C40]">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="bg-[#465b6f] py-24 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="scroll-animate inline-block px-4 py-1.5 bg-white/10 rounded-full text-sm font-medium mb-8">
            Services
          </div>
          <h2 className="scroll-animate delay-100 text-5xl font-serif mb-16">Your personalized care solutions</h2>

          <div className="flex flex-col border-t border-white/20">
            {[
              { id: '01', title: 'Family care', desc: 'Comprehensive health services for all ages, from newborns to seniors.' },
              { id: '02', title: 'Pediatric care', desc: 'Specialized medical attention tailored specifically for children.' },
              { id: '03', title: 'Vaccinations', desc: 'Stay protected with our complete immunization programs.' },
              { id: '04', title: 'Preventive care', desc: 'Proactive checkups and screenings to keep you healthy.' },
              { id: '05', title: 'Acute care', desc: 'Immediate attention for urgent, non-emergency health needs.' },
              { id: '06', title: 'Chronic disease management', desc: 'Ongoing support for diabetes, hypertension, and more.' },
            ].map((service, i) => (
              <div
                key={service.id}
                className={`service-row scroll-animate delay-${Math.min(i * 100, 500)} grid grid-cols-12 py-8 border-b border-white/20 hover:bg-white/5 transition-colors items-center cursor-pointer group`}
              >
                <div className="col-span-1 text-lg opacity-40 font-serif">{service.id}</div>
                <div className="col-span-4 text-2xl font-serif group-hover:text-[#E7DCAC] transition-colors">{service.title}</div>
                <div className="col-span-6 text-slate-300">{service.desc}</div>
                <div className="col-span-1 flex justify-end">
                  <div className="service-arrow w-8 h-8 rounded-full border border-white/30 flex items-center justify-center text-white">&#8594;</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES GRID ── */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium mb-8">
          What makes us different
        </div>
        <h2 className="scroll-animate delay-100 text-5xl font-serif mb-16 text-[#1A3C40]">Patient-centered care</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { 
              bg: 'bg-[#4A3728]', 
              text: 'text-white', 
              label: 'Holistic care', 
              sub: 'Mind, body and spirit',
              image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800'
            },
            { 
              bg: 'bg-[#D9D9D9]', 
              text: 'text-[#1A3C40]', 
              label: 'Personalized plans', 
              sub: 'Tailored to you',
              image: 'https://images.unsplash.com/photo-1666886573531-48d2e3c2b684?auto=format&fit=crop&q=80&w=800'
            },
            { 
              bg: 'bg-[#8C9C92]', 
              text: 'text-white', 
              label: 'Experienced staff', 
              sub: '40+ specialists',
              image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=800'
            },
            { 
              bg: 'bg-[#E5E1DA]', 
              text: 'text-[#1A3C40]', 
              label: 'Advanced technology', 
              sub: 'Modern equipment',
              image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
            },
            { 
              bg: 'bg-[#7C9070]', 
              text: 'text-white', 
              label: 'Family support', 
              sub: 'Care for all ages',
              image: 'https://images.unsplash.com/photo-1758691462666-6470b740f544?auto=format&fit=crop&q=80&w=800'
            },
            { 
              bg: 'bg-[#F2E8DF]', 
              text: 'text-[#1A3C40]', 
              label: 'Online appointments', 
              sub: 'Book anytime',
              image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
            },
          ].map((card, i) => (
            <div
              key={i}
              className={`scroll-animate delay-${Math.min(i * 100, 500)} card-hover relative overflow-hidden p-10 rounded-[40px] flex flex-col justify-end h-72 group`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={card.image} 
                  alt={card.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className={`absolute inset-0 opacity-60 transition-opacity duration-300 group-hover:opacity-40 ${card.bg}`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="relative z-10">
                <p className={`text-2xl font-serif mb-1 ${card.text !== 'text-white' ? 'group-hover:text-white' : 'text-white'} transition-colors duration-300`}>{card.label}</p>
                <p className={`text-sm opacity-80 ${card.text !== 'text-white' ? 'group-hover:text-white/80' : 'text-white/80'} transition-colors duration-300`}>{card.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── INSURANCE ── */}
      <section id="insurance" className="bg-[#F9F7F2] py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium mb-6">
              Insurance
            </div>
            <h2 className="scroll-animate delay-100 text-5xl font-serif text-[#1A3C40] mb-4">
              We accept most major plans
            </h2>
            <p className="scroll-animate delay-200 text-slate-500 text-lg max-w-xl mx-auto">
              Don't see your plan? Call us — we work with many providers and will do our best to accommodate you.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { name: 'Blue Cross Blue Shield', type: 'PPO / HMO' },
              { name: 'Aetna', type: 'PPO / HMO / EPO' },
              { name: 'Cigna', type: 'PPO / HMO' },
              { name: 'UnitedHealthcare', type: 'PPO / HMO / EPO' },
              { name: 'Humana', type: 'PPO / HMO' },
              { name: 'Kaiser Permanente', type: 'HMO' },
              { name: 'Medicare', type: 'Part A & B' },
              { name: 'Medicaid', type: 'Medi-Cal accepted' },
            ].map((ins, i) => (
              <div
                key={i}
                className={`scroll-animate delay-${Math.min(i * 100, 400)} card-hover bg-white rounded-2xl p-5 border border-slate-200 shadow-sm`}
              >
                <div className="w-10 h-10 bg-[#7C9070]/10 rounded-xl flex items-center justify-center mb-3">
                  <Shield size={18} className="text-[#7C9070]" />
                </div>
                <p className="font-semibold text-[#1A3C40] text-sm">{ins.name}</p>
                <p className="text-xs text-slate-400 mt-1">{ins.type}</p>
              </div>
            ))}
          </div>

          <div className="scroll-animate bg-[#1A3C40] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 text-white">
         <div>
           <h3 className="text-2xl font-serif mb-2">Not sure if we accept your insurance?</h3>
           <p className="text-slate-300">Call our billing team — we'll verify your coverage in minutes.</p>
         </div>
  
         <a href="tel:1234567890" className="flex-shrink-0 bg-[#E7DCAC] text-[#1A3C40] px-8 py-4 rounded-full font-bold hover:bg-[#d8cc9c] transition-all whitespace-nowrap">
           Call 123-456-7890
         </a>
       </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium mb-6">
              Patient stories
            </div>
            <h2 className="scroll-animate delay-100 text-5xl font-serif text-[#1A3C40]">What our patients say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: 'Priya Nair', role: 'Patient since 2018', review: 'Green Grove has been our family doctor for 6 years. The staff is always warm and the doctors genuinely care about your wellbeing.', rating: 5 },
              { name: 'James Okafor', role: 'Patient since 2021', review: 'After moving to SF, finding Green Grove was a blessing. Booking is easy, wait times are short, and the quality of care is outstanding.', rating: 5 },
              { name: 'Mei Lin', role: 'Patient since 2015', review: 'Dr. Shah and the whole team have been amazing through my health journey. I feel heard and respected every single visit.', rating: 5 },
            ].map((t, i) => (
              <div key={i} className={`scroll-animate delay-${i * 200} card-hover bg-white rounded-3xl p-8 border border-slate-100 shadow-sm`}>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => (
                    <Star key={j} size={16} className="fill-[#E7DCAC] text-[#E7DCAC]" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">"{t.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#7C9070] text-white flex items-center justify-center font-bold text-sm">
                    {t.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="font-semibold text-[#1A3C40] text-sm">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="bg-[#F9F7F2] py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium mb-6">
              FAQ
            </div>
            <h2 className="scroll-animate delay-100 text-5xl font-serif text-[#1A3C40]">Common questions</h2>
          </div>
          <FAQList />
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="scroll-animate inline-block px-4 py-1.5 bg-[#1A3C40]/10 rounded-full text-sm font-medium">
              Contact us
            </div>
            <h2 className="scroll-animate delay-100 text-5xl font-serif text-[#1A3C40]">Get in touch</h2>
            <p className="scroll-animate delay-200 text-slate-500 text-lg">
              Have a question or want to book an appointment? Reach out and we'll get back to you promptly.
            </p>
            <div className="scroll-animate delay-300 space-y-5">
              {[
                { icon: <MapPin size={20} />, label: 'Address', value: '42 Elmwood Drive, San Francisco, CA 94102' },
                { icon: <Phone size={20} />, label: 'Phone', value: '123-456-7890' },
                { icon: <Mail size={20} />, label: 'Email', value: 'hello@greengrove.com' },
                { icon: <Clock size={20} />, label: 'Hours', value: 'Mon–Fri: 8am–6pm · Sat: 9am–2pm' },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#7C9070]/10 text-[#7C9070] rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-slate-400 mb-0.5">{item.label}</p>
                    <p className="text-[#1A3C40] font-medium">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="scroll-animate-right delay-200">
            <ContactForm />
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#1A3C40] text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-[#E7DCAC] rounded flex items-center justify-center text-[#1A3C40]">
                  <Stethoscope size={18} />
                </div>
                <span className="font-serif text-lg">Healio</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed">
                Compassionate, modern healthcare for every stage of life.
              </p>
            </div>
            {[
              {
                title: 'Services',
                links: ['Family care', 'Pediatric care', 'Vaccinations', 'Preventive care', 'Acute care'],
              },
              {
                title: 'Clinic',
                links: ['About us', 'Our doctors', 'Patient portal', 'Careers', 'Press'],
              },
              {
                title: 'Support',
                links: ['Contact', 'Insurance', 'FAQ', 'Privacy policy', 'Terms of use'],
              },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-semibold text-sm mb-4 text-[#E7DCAC]">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="text-slate-400 text-sm hover:text-white transition-colors">{link}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">© 2026 Healio Medical Center. All rights reserved.</p>
            <div className="flex gap-6">
              {['Privacy policy', 'Terms of use', 'Cookie settings'].map(link => (
                <a key={link} href="#" className="text-slate-500 text-sm hover:text-white transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </div>
      </footer>

    </div>
    </>
  );
};

// ── FAQ accordion component ───────────────────────────────────────
const FAQList = () => {
  const [openIndex, setOpenIndex] = React.useState(null);

  const faqs = [
    { q: 'How do I book an appointment?', a: 'You can book online through our patient portal, call us at 123-456-7890, or walk in during clinic hours. Same-day appointments are often available.' },
    { q: 'Do you accept walk-in patients?', a: 'Yes! We welcome walk-ins during our operating hours. However, scheduled appointments are given priority, so booking ahead reduces your wait time.' },
    { q: 'Which insurance plans do you accept?', a: 'We accept most major insurance plans including Blue Cross Blue Shield, Aetna, Cigna, UnitedHealthcare, Humana, Medicare, and Medi-Cal. Call us to verify your specific plan.' },
    { q: 'What should I bring to my first visit?', a: 'Please bring a valid photo ID, your insurance card, a list of current medications, and any relevant medical records or referrals from previous providers.' },
    { q: 'Do you offer telehealth appointments?', a: 'Yes, we offer video consultations for follow-ups, prescription renewals, and non-urgent concerns. Book a telehealth appointment through our patient portal.' },
    { q: 'What are your clinic hours?', a: 'We are open Monday through Friday from 8:00 AM to 6:00 PM, and Saturday from 9:00 AM to 2:00 PM. We are closed on Sundays and public holidays.' },
  ];

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`scroll-animate delay-${Math.min(i * 100, 400)} bg-white rounded-2xl border border-slate-200 overflow-hidden transition-all`}
        >
          <button
            className="w-full flex justify-between items-center px-6 py-5 text-left"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium text-[#1A3C40]">{faq.q}</span>
            <ChevronDown
              size={18}
              className={`text-[#7C9070] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`}
            />
          </button>
          <div className={`faq-answer ${openIndex === i ? 'open' : ''}`}>
            <p className="px-6 pb-5 text-slate-500 text-sm leading-relaxed">{faq.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// ── Contact form component ────────────────────────────────────────
const ContactForm = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', message: '' });

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl border border-slate-200 p-10 flex flex-col items-center justify-center text-center h-full min-h-[400px]">
        <div className="w-16 h-16 bg-[#7C9070]/10 text-[#7C9070] rounded-full flex items-center justify-center mb-4 text-3xl">✓</div>
        <h3 className="text-2xl font-serif text-[#1A3C40] mb-2">Message sent!</h3>
        <p className="text-slate-500">We'll get back to you within 1 business day.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
      <h3 className="text-2xl font-serif text-[#1A3C40] mb-6">Send us a message</h3>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Name</label>
            <input
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              placeholder="Your full name"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] transition-colors"
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Phone</label>
            <input
              value={form.phone}
              onChange={e => setForm({ ...form, phone: e.target.value })}
              placeholder="Your phone number"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Email</label>
          <input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            placeholder="your@email.com"
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] transition-colors"
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">Message</label>
          <textarea
            value={form.message}
            onChange={e => setForm({ ...form, message: e.target.value })}
            placeholder="How can we help you?"
            rows={4}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm outline-none focus:border-[#7C9070] transition-colors resize-none"
          />
        </div>
        <button
          onClick={() => setSubmitted(true)}
          className="w-full bg-[#1A3C40] text-white py-4 rounded-xl font-bold hover:bg-[#142e31] transition-all"
        >
          Send message
        </button>
      </div>
    </div>
  );
};

export default LandingPage;