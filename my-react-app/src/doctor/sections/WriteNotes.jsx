import { useState } from 'react';

const patients = ['Vikram Shah', 'Priya Mehta', 'Rahul Kumar', 'Neha Kapoor', 'Anil Sharma'];
const templates = ['SOAP note', 'Progress note', 'Discharge summary', 'Referral note', 'Procedure note'];

const WriteNotes = () => {
  const [patient, setPatient] = useState('');
  const [template, setTemplate] = useState('');
  const [note, setNote] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="p-8 max-w-3xl">
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-slate-900">Write notes</h2>
        <p className="text-slate-500 text-sm mt-1">Create clinical notes for your patients</p>
      </div>
      <div className="bg-white rounded-xl border border-[#3b82f633] p-6 space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">Patient</label>
            <select value={patient} onChange={e => setPatient(e.target.value)} className="w-full bg-[#3b82f611] border border-[#3b82f633] rounded-xl py-3 px-4 text-sm text-slate-800 outline-none focus:border-[#4A6FA5]">
              <option value="">Select patient...</option>
              {patients.map(p => <option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">Template</label>
            <select value={template} onChange={e => setTemplate(e.target.value)} className="w-full bg-[#3b82f611] border border-[#3b82f633] rounded-xl py-3 px-4 text-sm text-slate-800 outline-none focus:border-[#4A6FA5]">
              <option value="">Select template...</option>
              {templates.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 block mb-2">Note</label>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={10}
            placeholder="Start typing your clinical note here..."
            className="w-full bg-[#3b82f611] border border-[#3b82f633] rounded-xl py-3 px-4 text-sm text-slate-800 outline-none focus:border-[#4A6FA5] resize-none font-mono placeholder-gray-700"
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-400">{note.length} characters</span>
          <button onClick={handleSave} className={`px-6 py-3 rounded-xl text-sm font-bold transition-all ${saved ? 'bg-green-700 text-green-700' : 'bg-blue-100 text-slate-900 hover:bg-[#3a5a80]'}`}>
            {saved ? 'Saved!' : 'Save note'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteNotes;