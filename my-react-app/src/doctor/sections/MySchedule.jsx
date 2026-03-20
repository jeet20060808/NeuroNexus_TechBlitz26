import { useState, useEffect } from 'react';
import { Clock, Calendar } from 'lucide-react';
import { api } from '../../api';

const MySchedule = ({ user }) => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
      api.getAppointments()
        .then(data => {
          const today = new Date().toISOString().split('T')[0];
          const filtered = data.appointments
            .filter(a => a.doctor_id === user.id && a.appointment_date === today)
            .sort((a, b) => a.start_time.localeCompare(b.start_time));
          setAppointments(filtered);
          setLoading(false);
        })
        .catch(err => {
          console.error("Schedule failed to load:", err);
          setLoading(false);
        });
    }
  }, [user?.id]);

  if (loading) return <div className="p-16 text-center text-slate-500">Loading your schedule...</div>;

  return (
    <div className="p-8 max-w-3xl animate-in fade-in">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h2 className="text-3xl font-serif text-[#1A3C40]">Clinical Schedule</h2>
          <p className="text-slate-500 text-sm mt-1 flex items-center gap-2">
            <Calendar size={14} className="text-[#7C9070]" />
            {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 overflow-hidden shadow-sm">
        {appointments.length === 0 ? (
          <div className="p-16 text-center text-slate-400 italic">
            No appointments scheduled for today.
          </div>
        ) : (
          appointments.map((a, i, arr) => (
            <div key={a.id} className={`flex items-center gap-6 px-8 py-5 group ${i !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
              <div className="w-20 text-sm text-[#1A3C40] font-black flex items-center gap-2 flex-shrink-0">
                <Clock size={14} className="text-[#7C9070]" />
                {a.start_time}
              </div>
              
              <div className="w-1.5 h-12 rounded-full bg-[#7C9070]/20 group-hover:bg-[#7C9070] transition-colors" />

              <div className="flex-1">
                <p className="text-base font-bold text-[#1A3C40] group-hover:text-[#7C9070] transition-colors">{a.patient_name}</p>
                <div className="flex items-center gap-4 mt-1">
                  <p className="text-xs text-slate-500 font-medium">{a.chief_complaint || 'General Consultation'}</p>
                  <span className="text-slate-300">|</span>
                  <p className="text-[10px] text-[#7C9070] font-bold uppercase tracking-wider">{a.status}</p>
                </div>
              </div>
              
              <button className="px-4 py-2 rounded-xl bg-slate-50 text-slate-400 text-[10px] font-bold uppercase hover:bg-[#1A3C40] hover:text-white transition-all shadow-sm">
                View Chart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MySchedule;