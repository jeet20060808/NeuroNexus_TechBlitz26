import { useState, useEffect } from 'react';
import { Search, ArrowLeft, Save, User, Activity, Mail, Download, CheckCircle, PlayCircle, Clock, Phone, MapPin, Heart, AlertCircle } from 'lucide-react';
import Badge from '../Badge';
import { api } from '../../api';

const TodaysPatients = ({ user }) => {
  const [search, setSearch] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApt, setSelectedApt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [emailing, setEmailing] = useState(false);

  // Note fields
  const [noteFields, setNoteFields] = useState({
    chief_complaint: '',
    examination_findings: '',
    diagnosis: '',
    treatment_plan: '',
    medications: '',
    follow_up: ''
  });

  const fetchApts = () => {
    if (user?.id) {
      setLoading(true);
      const today = new Date().toISOString().split('T')[0];
      api.getAppointments(today)
        .then(data => {
          const mine = data.appointments.filter(a => a.doctor_id === user.id);
          setAppointments(mine);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load doctor's appointments:", err);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    fetchApts();
  }, [user?.id]);

  const handleSelectApt = (apt) => {
    setSelectedApt(apt);
    setNoteFields({
      chief_complaint: apt.chief_complaint || '',
      examination_findings: '',
      diagnosis: '',
      treatment_plan: '',
      medications: '',
      follow_up: ''
    });
    // If there's an existing note, pre-fill it (optional, would need getNotes call)
    api.getNotes(apt.id).then(res => {
        if (res.notes && res.notes.length > 0) {
            const latest = res.notes[res.notes.length - 1];
            setNoteFields({
                chief_complaint: latest.chief_complaint || apt.chief_complaint || '',
                examination_findings: latest.examination_findings || '',
                diagnosis: latest.diagnosis || '',
                treatment_plan: latest.treatment_plan || '',
                medications: latest.medications || '',
                follow_up: latest.follow_up || ''
            });
        }
    });
  };

  const handleUpdateStatus = async (newStatus) => {
    try {
      await api.updateAppointmentStatus(selectedApt.id, newStatus);
      setSelectedApt({ ...selectedApt, status: newStatus });
      fetchApts(); // Refresh list in background
      alert(`Patient marked as ${newStatus}`);
    } catch (err) {
      alert("Failed to update status.");
    }
  };

  const handleSaveNote = async () => {
    setSaving(true);
    try {
      await api.createNote({
        appointment_id: selectedApt.id,
        doctor_id: user.id,
        ...noteFields,
        note_text: `Consultation on ${new Date().toLocaleDateString()}`
      });
      alert("Clinical findings saved successfully!");
    } catch (err) {
      alert("Failed to save findings.");
    } finally {
      setSaving(false);
    }
  };

  const handleEmailReport = async () => {
    if (!selectedApt.email) {
        alert("Patient does not have an email address recorded.");
        return;
    }
    setEmailing(true);
    try {
      await api.sendReport({
        appointment_id: selectedApt.id,
        email: selectedApt.email,
        patient_name: selectedApt.patient_name,
        report_data: {
            doctor: user.name,
            ...noteFields
        }
      });
      alert(`Report sent successfully to ${selectedApt.email}`);
    } catch (err) {
      alert("Failed to send email.");
    } finally {
      setEmailing(false);
    }
  };

  const handleDownloadReport = () => {
    window.print(); // Simple way to generate PDF via print dialog
  };

  if (loading) return <div className="p-16 text-center text-slate-500 font-serif text-xl animate-pulse">Loading Clinical Workspace...</div>;

  if (selectedApt) {
    return (
      <div className="p-8 max-w-7xl mx-auto animate-in slide-in-from-right-10 duration-500">
        <div className="flex justify-between items-center mb-8">
            <button 
                onClick={() => setSelectedApt(null)}
                className="flex items-center gap-2 text-[#7C9070] font-black text-[10px] uppercase tracking-widest hover:translate-x-[-4px] transition-transform"
            >
                <ArrowLeft size={16} /> Patient Registry
            </button>
            <div className="flex gap-3">
                <button 
                    onClick={() => handleUpdateStatus('ONGOING')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase transition-all shadow-sm ${selectedApt.status === 'ONGOING' ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600 hover:bg-blue-100'}`}
                >
                    <PlayCircle size={14} /> Ongoing
                </button>
                <button 
                    onClick={() => handleUpdateStatus('DONE')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase transition-all shadow-sm ${selectedApt.status === 'DONE' ? 'bg-[#7C9070] text-white' : 'bg-[#7C9070]/10 text-[#7C9070] hover:bg-[#7C9070]/20'}`}
                >
                    <CheckCircle size={14} /> Completed
                </button>
                <button 
                    onClick={() => handleUpdateStatus('REMAINING')}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-black uppercase transition-all shadow-sm ${selectedApt.status === 'REMAINING' ? 'bg-orange-600 text-white' : 'bg-orange-50 text-orange-600 hover:bg-orange-100'}`}
                >
                    <Clock size={14} /> Remaining
                </button>
            </div>
        </div>

        <div className="grid grid-cols-12 gap-8 print:block">
          {/* Patient Profile Column */}
          <div className="col-span-12 lg:col-span-4 space-y-8 print:hidden">
            <div className="bg-white rounded-[40px] border border-[#7C9070]/20 p-8 shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <User size={120} />
                </div>
                <div className="w-24 h-24 rounded-[32px] bg-[#7C9070]/10 text-[#7C9070] flex items-center justify-center text-4xl font-black mb-6 mx-auto shadow-inner">
                    {selectedApt.patient_name.charAt(0)}
                </div>
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-serif text-[#1A3C40] mb-1">{selectedApt.patient_name}</h2>
                    <p className="text-[#7C9070] text-xs font-black uppercase tracking-[0.2em]">Patient Profile</p>
                </div>
                
                <div className="space-y-5">
                    <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <User className="text-[#7C9070] shrink-0" size={18} />
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Identifiers</p>
                            <p className="text-sm font-bold text-[#1A3C40]">{selectedApt.gender || 'Not Specified'} · {selectedApt.dob || 'DOB N/A'}</p>
                            <p className="text-[10px] text-[#7C9070] font-bold mt-1 uppercase">ID: {selectedApt.patient_id.split('-')[0].toUpperCase()}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <Heart className="text-red-400 shrink-0" size={18} />
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Blood Registry</p>
                            <p className="text-sm font-bold text-red-600 uppercase">{selectedApt.blood_group || 'Unknown'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <Phone className="text-[#7C9070] shrink-0" size={18} />
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Contact Info</p>
                            <p className="text-sm font-bold text-[#1A3C40]">{selectedApt.phone || 'No phone'}</p>
                            <p className="text-xs text-slate-500 mt-1">{selectedApt.email || 'No email'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <MapPin className="text-[#7C9070] shrink-0" size={18} />
                        <div>
                            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Residential Address</p>
                            <p className="text-xs font-medium text-[#1A3C40] leading-relaxed">{selectedApt.address || 'No address provided.'}</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 bg-orange-50 rounded-2xl border border-orange-100 shadow-orange-100/20 shadow-lg">
                        <AlertCircle className="text-orange-500 shrink-0" size={18} />
                        <div>
                            <p className="text-[10px] text-orange-400 font-black uppercase tracking-widest mb-1">Emergency Contact</p>
                            <p className="text-xs font-bold text-orange-900 leading-relaxed">{selectedApt.emergency_contact || 'None registered.'}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-[#1A3C40] rounded-[40px] p-8 text-white shadow-xl shadow-[#1A3C40]/20">
                <h4 className="flex items-center gap-2 text-xs font-black text-[#7C9070] uppercase tracking-widest mb-6">
                    <Activity size={14} /> Medical History
                </h4>
                <div className="space-y-6">
                    <div>
                        <p className="text-[10px] text-[#7C9070] font-black uppercase tracking-widest mb-2">Previous Conditions</p>
                        <p className="text-xs font-medium leading-relaxed italic text-white/80">
                            {selectedApt.medical_history || 'Patient profile shows no existing clinical history.'}
                        </p>
                    </div>
                    {selectedApt.allergies && (
                      <div className="pt-4 border-t border-white/10">
                        <p className="text-[10px] text-red-300 font-black uppercase mb-2">Hypersensitivities</p>
                        <p className="text-xs text-red-100 font-bold bg-red-500/20 py-2 px-3 rounded-xl border border-red-500/30">{selectedApt.allergies}</p>
                      </div>
                    )}
                </div>
            </div>
          </div>

          {/* Clinical Workspace Column */}
          <div className="col-span-12 lg:col-span-8 print:col-span-12">
            <div className="bg-white rounded-[48px] border border-[#7C9070]/20 p-10 shadow-3xl flex flex-col min-h-screen">
                <div className="flex justify-between items-start mb-10 print:mb-6">
                    <div>
                        <h3 className="text-3xl font-serif text-[#1A3C40]">Consultation findings</h3>
                        <p className="text-[#7C9070] text-xs font-black uppercase tracking-[0.3em] mt-2">Dr. {user.name} — Clinical Documentation</p>
                    </div>
                    <div className="flex gap-4 print:hidden">
                        <button onClick={handleDownloadReport} title="Download Report" className="p-4 bg-slate-50 text-slate-400 hover:text-[#1A3C40] hover:bg-slate-100 rounded-3xl transition-all">
                            <Download size={22} />
                        </button>
                        <button onClick={handleEmailReport} disabled={emailing} title="Email to Patient" className={`p-4 bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-3xl transition-all ${emailing ? 'animate-bounce' : ''}`}>
                            <Mail size={22} />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="space-y-8">
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block">1. Chief Complaint</label>
                            <textarea 
                                value={noteFields.chief_complaint} 
                                onChange={(e) => setNoteFields({...noteFields, chief_complaint: e.target.value})}
                                placeholder="Patient states..." 
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] transition-all min-h-[100px] print:border-none print:p-0"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block">2. Examination Findings</label>
                            <textarea 
                                value={noteFields.examination_findings} 
                                onChange={(e) => setNoteFields({...noteFields, examination_findings: e.target.value})}
                                placeholder="Vitals, physical exam..." 
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] transition-all min-h-[100px] print:border-none print:p-0"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block">3. Primary Diagnosis</label>
                            <textarea 
                                value={noteFields.diagnosis} 
                                onChange={(e) => setNoteFields({...noteFields, diagnosis: e.target.value})}
                                placeholder="Clinical diagnosis..." 
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] transition-all min-h-[80px] print:border-none print:p-0 font-bold"
                            />
                        </div>
                    </div>
                    <div className="space-y-8">
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block">4. Treatment Plan</label>
                            <textarea 
                                value={noteFields.treatment_plan} 
                                onChange={(e) => setNoteFields({...noteFields, treatment_plan: e.target.value})}
                                placeholder="Strategy and approach..." 
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] transition-all min-h-[100px] print:border-none print:p-0"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block text-red-500">5. Medications (Prescription)</label>
                            <textarea 
                                value={noteFields.medications} 
                                onChange={(e) => setNoteFields({...noteFields, medications: e.target.value})}
                                placeholder="Generic - Dose - Frequency" 
                                className="w-full bg-red-50/30 border border-red-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-red-400 transition-all min-h-[100px] print:border-none print:p-0 font-mono"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-black text-[#7C9070] uppercase tracking-widest mb-3 block">6. Follow-up Instructions</label>
                            <textarea 
                                value={noteFields.follow_up} 
                                onChange={(e) => setNoteFields({...noteFields, follow_up: e.target.value})}
                                placeholder="When to return?" 
                                className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-sm text-[#1A3C40] outline-none focus:border-[#7C9070] transition-all min-h-[80px] print:border-none print:p-0"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-50 flex justify-between items-center print:hidden">
                    <p className="text-[10px] text-[#7C9070] font-black uppercase tracking-widest flex items-center gap-2">
                        <Activity size={12} /> Auto-saving Clinical Log active
                    </p>
                    <div className="flex gap-4">
                        <button 
                            onClick={handleSaveNote}
                            disabled={saving}
                            className="bg-[#1A3C40] text-white px-12 py-4 rounded-[20px] font-black text-xs uppercase tracking-[0.2em] hover:shadow-2xl active:scale-95 transition-all shadow-xl shadow-[#1A3C40]/30 disabled:opacity-50"
                        >
                            {saving ? 'Processing...' : 'Secure & Close File'}
                        </button>
                    </div>
                </div>
                
                {/* Print Layout Header (Hidden in Screen) */}
                <div className="hidden print:block mt-12 border-t pt-10 text-center">
                    <p className="text-sm font-bold">Electronically Signed</p>
                    <p className="text-xl font-serif mt-2">Dr. {user.name}</p>
                    <p className="text-xs text-slate-500 uppercase tracking-widest mt-1">{user.specialization || 'Clinical Practitioner'}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filtered = appointments.filter(a => a.patient_name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="p-8 max-w-5xl mx-auto animate-in fade-in">
      <div className="flex justify-between items-end mb-12">
        <div>
            <h2 className="text-5xl font-serif text-[#1A3C40] mb-3">Clinical Queue</h2>
            <div className="h-1.5 w-24 bg-[#7C9070] rounded-full mb-4"></div>
            <p className="text-[#7C9070] text-xs font-black uppercase tracking-[0.3em]">
            Digital Practice Workspace · Dr. {user.name}
            </p>
        </div>
        <div className="text-right">
            <h3 className="text-3xl font-serif text-[#1A3C40]">{appointments.length}</h3>
            <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest font-sans">Active Files Today</p>
        </div>
      </div>

      <div className="relative mb-12 group">
        <div className="absolute inset-0 bg-[#7C9070]/5 rounded-[32px] blur-2xl group-hover:bg-[#7C9070]/10 transition-all"></div>
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#7C9070]" size={24} />
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search clinical registry..."
          className="relative w-full bg-white/80 backdrop-blur-xl border border-[#7C9070]/20 rounded-[32px] py-6 pl-16 pr-8 text-lg font-medium text-[#1A3C40] outline-none focus:border-[#7C9070] shadow-xl focus:ring-8 focus:ring-[#7C9070]/5 transition-all"
        />
      </div>

      <div className="space-y-6">
        {appointments.length === 0 ? (
          <div className="bg-white rounded-[40px] border border-[#7C9070]/20 p-20 text-center shadow-lg">
            <User size={48} className="mx-auto text-slate-100 mb-6" />
            <p className="text-slate-400 font-serif text-xl italic">The clinical queue is currently clear.</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-400 italic font-serif">Registry lookup failed for "{search}"</div>
        ) : (
          filtered.map((a, i) => (
            <div 
                key={a.id} 
                onClick={() => handleSelectApt(a)}
                className="group relative bg-white hover:bg-slate-50/50 rounded-[40px] p-8 cursor-pointer transition-all border border-[#7C9070]/10 hover:border-[#7C9070]/40 shadow-sm hover:shadow-2xl hover:scale-[1.01]"
            >
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 rounded-[28px] bg-[#7C9070]/5 text-[#7C9070] flex items-center justify-center text-3xl font-black group-hover:bg-[#7C9070] group-hover:text-white transition-all transform group-hover:rotate-6">
                    {a.patient_name.charAt(0)}
                </div>
                <div className="flex-1">
                    <div className="flex items-center gap-4 mb-2">
                        <h4 className="text-2xl font-serif text-[#1A3C40]">{a.patient_name}</h4>
                        <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full ${
                            a.status === 'DONE' ? 'bg-green-100 text-green-700' :
                            a.status === 'ONGOING' ? 'bg-blue-100 text-blue-700 animate-pulse' :
                            'bg-orange-100 text-orange-700'
                        }`}>
                            {a.status}
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-slate-400">
                             <Clock size={14} />
                             <span className="text-xs font-bold uppercase tracking-widest">{a.start_time}</span>
                        </div>
                        <div className="h-1 w-1 rounded-full bg-slate-300"></div>
                        <p className="text-xs font-bold text-[#7C9070] uppercase tracking-tighter">
                            {a.chief_complaint || 'OPD Consultation'}
                        </p>
                    </div>
                </div>
                <button className="h-14 w-14 rounded-full bg-slate-50 text-[#7C9070] flex items-center justify-center group-hover:bg-[#1A3C40] group-hover:text-white transition-all shadow-inner">
                    <ArrowLeft className="rotate-180" size={20} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TodaysPatients;