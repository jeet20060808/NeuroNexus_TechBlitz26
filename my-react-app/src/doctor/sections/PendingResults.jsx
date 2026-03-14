import Badge from '../Badge';

const results = [
  { patient: 'Anil Sharma', test: 'HbA1c + Lipid panel', ordered: '12 Mar', lab: 'Pathology', urgency: 'Routine' },
  { patient: 'Vikram Shah', test: 'Echo + Stress test', ordered: '13 Mar', lab: 'Cardiology', urgency: 'Urgent' },
  { patient: 'Rahul Kumar', test: '24hr Holter monitor', ordered: '13 Mar', lab: 'Electrophysiology', urgency: 'Routine' },
  { patient: 'Neha Kapoor', test: 'Post-op coag panel', ordered: '11 Mar', lab: 'Pathology', urgency: 'Urgent' },
];

const PendingResults = () => (
  <div className="p-8 max-w-4xl">
    <div className="flex items-center gap-3 mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Pending results</h2>
      <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-bold">{results.length} pending</span>
    </div>
    <div className="space-y-3">
      {results.map((r, i) => (
        <div key={i} className="bg-white rounded-xl border border-[#3b82f633] px-5 py-4 flex items-center gap-4">
          <div className={`w-1.5 h-10 rounded-full flex-shrink-0 ${r.urgency === 'Urgent' ? 'bg-red-500' : 'bg-yellow-500'}`} />
          <div className="flex-1">
            <p className="text-sm font-medium text-slate-900">{r.test}</p>
            <p className="text-xs text-slate-500 mt-0.5">{r.patient} · {r.lab} · Ordered {r.ordered}</p>
          </div>
          <Badge label={r.urgency} />
        </div>
      ))}
    </div>
  </div>
);

export default PendingResults;