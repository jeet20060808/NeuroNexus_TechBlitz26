import React from 'react';

const BookAppointment = ({ setCurrentTab }) => {
  return (
    <div className="animate-in fade-in grid grid-cols-12 gap-6">
      <div className="col-span-6 bg-white rounded-xl border border-[#3b82f633] p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-6">Book new appointment</h2>
        <form className="space-y-5">
          <div><label className="block text-sm text-slate-600 mb-2">Patient</label><input type="text" placeholder="Search patient name or ID..." className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none" /></div>
          <div><label className="block text-sm text-slate-600 mb-2">Doctor</label><select className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none"><option>Select doctor...</option><option>Dr. Mehta</option></select></div>
          <div>
            <label className="block text-sm text-slate-600 mb-2">Visit type</label>
            <div className="flex gap-2 flex-wrap">
              <span className="bg-blue-100 text-slate-900 px-3 py-1 rounded-full text-sm cursor-pointer">New visit</span>
              <span className="bg-blue-100 hover:bg-[#444] text-slate-900 px-3 py-1 rounded-full text-sm cursor-pointer">Follow-up</span>
              <span className="bg-blue-100 hover:bg-[#444] text-slate-900 px-3 py-1 rounded-full text-sm cursor-pointer">Emergency</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm text-slate-600 mb-2">Date</label><input type="date" className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none" /></div>
            <div><label className="block text-sm text-slate-600 mb-2">Time slot</label><input type="time" className="w-full bg-[#3b82f633] border border-[#3b82f633] rounded px-4 py-2.5 text-slate-900 outline-none" /></div>
          </div>
          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={() => setCurrentTab('Overview')} className="px-6 py-2 rounded bg-transparent text-slate-900 border border-[#333] hover:bg-[#333]">Clear</button>
            <button type="button" className="px-6 py-2 rounded bg-white text-[#1E1E1E] font-medium hover:bg-gray-200">Confirm booking</button>
          </div>
        </form>
      </div>
      <div className="col-span-6 space-y-6">
        <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Available slots — Dr. Mehta</h3>
          <div className="grid grid-cols-4 gap-3">
            {['09:00','09:15','09:30','09:45'].map(t=><div key={t} className="bg-red-100/20 text-[#8B3A3A] border border-[#8B3A3A]/30 py-1 text-center rounded text-sm">{t}</div>)}
            {['10:00','10:15','10:30','10:45'].map(t=><div key={t} className="bg-green-100/20 text-green-400 border border-[#2E603A]/30 py-1 text-center rounded text-sm">{t}</div>)}
          </div>
          <div className="flex gap-4 mt-4 text-xs text-slate-600">
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-green-100 rounded-full"></div> Available</div>
            <div className="flex items-center gap-1"><div className="w-2 h-2 bg-red-100 rounded-full"></div> Booked</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;
