import { useState, useEffect } from 'react';

const WriteNotes = () => {
  return (
    <div className="p-8 max-w-3xl animate-in fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-serif text-[#1A3C40]">Write notes</h2>
        <p className="text-slate-500 text-sm mt-1">Create clinical notes for your patients</p>
      </div>
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-12 text-center shadow-sm">
        <p className="text-[#1A3C40] font-medium mb-2">Note writing is now integrated!</p>
        <p className="text-slate-500 text-sm">To write a note, please go to <span className="font-bold text-[#7C9070]">Today's Patients</span> and click on the patient you are currently seeing.</p>
      </div>
    </div>
  );
};

export default WriteNotes;