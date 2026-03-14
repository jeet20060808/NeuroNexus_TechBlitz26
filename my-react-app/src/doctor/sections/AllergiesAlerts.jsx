import Badge from '../Badge';

const allergies = [
  { patient: 'Vikram Shah', allergen: 'Penicillin', reaction: 'Anaphylaxis', severity: 'Severe' },
  { patient: 'Priya Mehta', allergen: 'Sulfa drugs', reaction: 'Rash', severity: 'Moderate' },
  { patient: 'Anil Sharma', allergen: 'Contrast dye', reaction: 'Urticaria', severity: 'Moderate' },
  { patient: 'Neha Kapoor', allergen: 'Aspirin', reaction: 'Bronchospasm', severity: 'Severe' },
  { patient: 'Rahul Kumar', allergen: 'Latex', reaction: 'Contact dermatitis', severity: 'Mild' },
];

const AllergiesAlerts = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Allergies & alerts</h2>
      <p className="text-slate-500 text-sm mt-1">{allergies.filter(a => a.severity === 'Severe').length} severe allergies on record</p>
    </div>
    <div className="space-y-3">
      {allergies.map((a, i) => (
        <div key={i} className={`bg-white rounded-xl border px-5 py-4 flex items-center gap-4 ${a.severity === 'Severe' ? 'border-red-200' : 'border-[#3b82f633]'}`}>
          <div className={`w-1.5 h-10 rounded-full flex-shrink-0 ${a.severity === 'Severe' ? 'bg-red-500' : a.severity === 'Moderate' ? 'bg-yellow-500' : 'bg-green-500'}`} />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{a.allergen}</p>
            <p className="text-xs text-slate-500 mt-0.5">{a.patient} · Reaction: {a.reaction}</p>
          </div>
          <Badge label={a.severity} />
        </div>
      ))}
    </div>
  </div>
);

export default AllergiesAlerts;