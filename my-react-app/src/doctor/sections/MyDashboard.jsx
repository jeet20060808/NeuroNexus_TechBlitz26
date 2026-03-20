import { useState, useEffect } from 'react';
import Badge from '../Badge';
import { api } from '../../api';
import { Clock, User } from 'lucide-react';

const MyDashboard = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.getAppointments()
        .then(data => {
          // Filter appointments for this doctor today
          const today = new Date().toISOString().split('T')[0];
          const filtered = data.appointments.filter(a => 
            a.doctor_id === user.id && a.appointment_date === today
          );
          setAppointments(filtered);
          setLoading(false);
        })
        .catch(err => {
          console.error("Dashboard failed to load appointments:", err);
          setLoading(false);
        });
    }
  }, [user?.id]);

  if (loading) return <div className="p-16 text-center text-slate-500">Loading dashboard...</div>;

  return (
    <div className="p-8 max-w-[1400px] w-full animate-in fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-[#1A3C40]">Welcome, {user?.name}</h2>
        <p className="text-slate-500 text-sm mt-1">Here is an overview of your patients for today.</p>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-8 space-y-8">
          {/* Patient Queue */}
          <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-6 shadow-sm">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-lg font-bold text-[#1A3C40]">Your Patient Queue (Today)</h2>
              <span className="text-[10px] bg-[#7C9070]/10 text-[#7C9070] px-3 py-1 rounded-full uppercase tracking-widest font-bold">
                {appointments.length} Patients
              </span>
            </div>
            
            <div className="space-y-3">
              {appointments.length === 0 ? (
                <div className="p-12 text-center text-slate-400 italic bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  No patients scheduled for today.
                </div>
              ) : (
                appointments.map((a, i) => (
                  <div key={a.id} className="flex justify-between items-center p-4 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-[#7C9070]/5 transition-all cursor-pointer group">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#7C9070]/10 text-[#7C9070] flex items-center justify-center text-lg font-black group-hover:bg-[#7C9070] group-hover:text-white transition-colors">
                        {a.patient_name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-[#1A3C40] font-bold text-base group-hover:text-[#7C9070] transition-colors">{a.patient_name}</p>
                        <div className="flex items-center gap-3 mt-0.5">
                          <span className="flex items-center gap-1 text-[11px] text-slate-500 font-medium">
                            <Clock size={12} /> {a.start_time}
                          </span>
                          <span className="text-slate-300">•</span>
                          <span className="text-[11px] text-slate-500 font-medium">{a.chief_complaint || 'Regular Checkup'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge label={a.status} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Quick Stats or Small Summary on the side */}
        <div className="col-span-12 lg:col-span-4 space-y-6">
          <div className="bg-[#1A3C40] rounded-[32px] p-8 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
                <p className="text-slate-300 text-xs font-bold uppercase tracking-wider mb-2">Daily Summary</p>
                <h3 className="text-4xl font-serif mb-6">{appointments.length} <span className="text-sm font-sans font-normal opacity-60">Consultations</span></h3>
                
                <div className="space-y-4">
                   <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs opacity-70">Completed</span>
                      <span className="text-sm font-bold">{appointments.filter(a => a.status === 'Completed').length}</span>
                   </div>
                   <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs opacity-70">Pending</span>
                      <span className="text-sm font-bold">{appointments.filter(a => a.status === 'Scheduled' || a.status === 'Arrived').length}</span>
                   </div>
                </div>
             </div>
             <User className="absolute -bottom-8 -right-8 opacity-5 text-white" size={200} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyDashboard;