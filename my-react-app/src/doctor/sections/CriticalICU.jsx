const patients = [
  { initials: 'VS', name: 'Vikram Shah', id: 'PT-001', bed: 'CCU Bed 3', condition: 'NSTEMI w/ instability', bp: '90/60', hr: 112, spo2: 94 },
  { initials: 'DP', name: 'Dev Patel', id: 'PT-007', bed: 'CCU Bed 5', condition: 'Acute heart failure', bp: '100/65', hr: 98, spo2: 91 },
];

const CriticalICU = () => (
  <div className="p-8 max-w-4xl">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Critical / ICU</h2>
      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">{patients.length} Critical</span>
    </div>
    <div className="space-y-6">
      {patients.map((p, i) => (
        <div key={i} className="bg-white rounded-xl border-2 border-red-200 p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-full bg-red-100 text-red-700 flex items-center justify-center font-bold text-sm">{p.initials}</div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-slate-900">{p.name}</p>
                <span className="text-xs text-slate-400">{p.id}</span>
              </div>
              <p className="text-xs text-slate-500">{p.bed} · {p.condition}</p>
            </div>
            <span className="ml-auto bg-red-100 text-red-700 text-xs font-bold px-3 py-1 rounded animate-pulse">Alert</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Blood pressure', value: p.bp, unit: 'mmHg', warn: false },
              { label: 'Heart rate', value: p.hr, unit: 'bpm', warn: p.hr > 100 },
              { label: 'SpO₂', value: `${p.spo2}%`, unit: '', warn: p.spo2 < 95 },
            ].map(v => (
              <div key={v.label} className={`rounded-xl p-4 ${v.warn ? 'bg-red-50 border border-red-200' : 'bg-[#3b82f611] border border-[#3b82f633]'}`}>
                <p className="text-xs text-slate-500 mb-1">{v.label}</p>
                <p className={`text-xl font-semibold ${v.warn ? 'text-red-400' : 'text-slate-900'}`}>
                  {v.value} <span className="text-xs font-normal text-slate-500">{v.unit}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default CriticalICU;