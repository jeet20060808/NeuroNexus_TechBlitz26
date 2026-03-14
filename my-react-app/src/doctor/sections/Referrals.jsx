import Badge from '../Badge';

const referrals = [
  { patient: 'Vikram Shah', to: 'ICU / Cardiology', reason: 'NSTEMI w/ instability', date: '13 Mar', status: 'Urgent' },
  { patient: 'Anil Sharma', to: 'Endocrinology', reason: 'DM management', date: '13 Mar', status: 'Pending' },
  { patient: 'Rahul Kumar', to: 'Electrophysiology', reason: 'Palpitation workup', date: '13 Mar', status: 'Sent' },
  { patient: 'Neha Kapoor', to: 'Physiotherapy', reason: 'Post-op rehab', date: '11 Mar', status: 'Sent' },
];

const Referrals = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Referrals</h2>
      <p className="text-slate-500 text-sm mt-1">{referrals.length} referrals sent</p>
    </div>
    <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
      <div className="grid grid-cols-5 px-5 py-3 bg-[#3b82f611] border-b border-[#3b82f633] text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span>Patient</span><span>Referred to</span><span className="col-span-2">Reason</span><span>Status</span>
      </div>
      {referrals.map((r, i, arr) => (
        <div key={i} className={`grid grid-cols-5 px-5 py-4 items-center text-sm ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
          <span className="font-medium text-slate-900">{r.patient}</span>
          <span className="text-slate-600">{r.to}</span>
          <span className="col-span-2 text-slate-600">{r.reason}</span>
          <Badge label={r.status} />
        </div>
      ))}
    </div>
  </div>
);

export default Referrals;