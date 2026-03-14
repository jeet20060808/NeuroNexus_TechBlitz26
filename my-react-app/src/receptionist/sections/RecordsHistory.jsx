import React from 'react';

const RecordsHistory = () => {
  return (
    <div className="animate-in fade-in grid grid-cols-12 gap-6">
      <div className="col-span-5 space-y-6">
        <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-semibold text-slate-900">Patient — Example Record</h3>
            <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">P-0041</span>
          </div>
          <div className="space-y-4">
            <div><p className="text-slate-600 text-xs mb-1">Chronic conditions</p><div className="bg-[#3b82f633] p-3 rounded text-sm text-slate-800">Hypertension, Type 2 Diabetes</div></div>
            <div><p className="text-slate-600 text-xs mb-1">Allergies</p><div className="bg-[#3b82f633] p-3 rounded text-sm text-slate-800">Penicillin (severe), Aspirin (mild)</div></div>
            <div><p className="text-slate-600 text-xs mb-1">Current medications</p><div className="bg-[#3b82f633] p-3 rounded text-sm text-slate-800">Metformin 500mg, Amlodipine 5mg</div></div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Documents on file</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between border-b border-[#3b82f633]/50 pb-2"><span className="text-slate-700">ID proof — Aadhaar card</span><span className="text-green-400 text-xs">Verified</span></div>
            <div className="flex justify-between border-b border-[#3b82f633]/50 pb-2"><span className="text-slate-700">Consent form — signed</span><span className="text-green-400 text-xs">On file</span></div>
            <div className="flex justify-between"><span className="text-slate-700">Lab report — Mar 2026</span><span className="text-blue-400 text-xs">Attached</span></div>
          </div>
        </div>
      </div>
      <div className="col-span-7 space-y-6">
        <div className="bg-white rounded-xl border border-[#3b82f633] p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Visit history</h3>
          <div className="space-y-4 pl-2 border-l border-[#3b82f633] ml-2">
            <div className="relative pl-4">
              <div className="absolute w-2 h-2 bg-blue-500 rounded-full -left-[5px] top-1.5"></div>
              <p className="text-sm text-slate-600 mb-0.5">13 Mar 26</p>
              <p className="text-slate-900 text-sm">Dr. Mehta • Follow-up • BP review</p>
              <span className="text-green-500 text-xs font-medium">Attended</span>
            </div>
            <div className="relative pl-4">
              <div className="absolute w-2 h-2 bg-red-500 rounded-full -left-[5px] top-1.5"></div>
              <p className="text-sm text-slate-600 mb-0.5">18 Nov 25</p>
              <p className="text-slate-900 text-sm">Dr. Mehta • Scheduled checkup</p>
              <span className="text-red-500 text-xs font-medium">No-show</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordsHistory;
