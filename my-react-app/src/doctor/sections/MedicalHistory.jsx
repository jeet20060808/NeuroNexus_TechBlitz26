import Badge from '../Badge';

const history = [
  { patient: 'Vikram Shah', condition: 'Hypertension', since: '2018', meds: 'Amlodipine', status: 'Ongoing' },
  { patient: 'Vikram Shah', condition: 'Type 2 Diabetes', since: '2020', meds: 'Metformin', status: 'Ongoing' },
  { patient: 'Priya Mehta', condition: 'Hypothyroidism', since: '2015', meds: 'Levothyroxine', status: 'Controlled' },
  { patient: 'Anil Sharma', condition: 'CAD', since: '2022', meds: 'Aspirin, Statin', status: 'Ongoing' },
  { patient: 'Neha Kapoor', condition: 'Mitral valve prolapse', since: '2019', meds: 'Beta-blocker', status: 'Monitored' },
];

const MedicalHistory = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Medical history</h2>
    </div>
    <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
      <div className="grid grid-cols-5 px-5 py-3 bg-[#3b82f611] border-b border-[#3b82f633] text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Patient</span><span>Condition</span><span>Since</span><span>Medications</span><span>Status</span>
      </div>
      {history.map((h, i, arr) => (
        <div key={i} className={`grid grid-cols-5 px-5 py-4 items-center text-sm ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
          <span className="font-medium text-slate-900">{h.patient}</span>
          <span className="text-slate-700">{h.condition}</span>
          <span className="text-slate-500">{h.since}</span>
          <span className="text-slate-600 text-xs">{h.meds}</span>
          <Badge label={h.status} />
        </div>
      ))}
    </div>
  </div>
);

export default MedicalHistory;