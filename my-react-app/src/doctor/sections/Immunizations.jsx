import Badge from '../Badge';

const immunizations = [
  { patient: 'Vikram Shah', vaccine: 'Influenza', date: 'Oct 2025', next: 'Oct 2026', status: 'Up to date' },
  { patient: 'Priya Mehta', vaccine: 'COVID-19 booster', date: 'Jan 2026', next: 'Jan 2027', status: 'Up to date' },
  { patient: 'Anil Sharma', vaccine: 'Pneumococcal', date: 'Mar 2023', next: 'Mar 2028', status: 'Up to date' },
  { patient: 'Rahul Kumar', vaccine: 'Hepatitis B', date: 'Jun 2024', next: 'Due now', status: 'Due' },
];

const Immunizations = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Immunizations</h2>
    </div>
    <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
      <div className="grid grid-cols-5 px-5 py-3 bg-[#3b82f611] border-b border-[#3b82f633] text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Patient</span><span>Vaccine</span><span>Given</span><span>Next due</span><span>Status</span>
      </div>
      {immunizations.map((v, i, arr) => (
        <div key={i} className={`grid grid-cols-5 px-5 py-4 items-center text-sm ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
          <span className="font-medium text-slate-900">{v.patient}</span>
          <span className="text-slate-700">{v.vaccine}</span>
          <span className="text-slate-500">{v.date}</span>
          <span className={v.status === 'Due' ? 'text-red-400 font-medium' : 'text-slate-500'}>{v.next}</span>
          <Badge label={v.status} />
        </div>
      ))}
    </div>
  </div>
);

export default Immunizations;