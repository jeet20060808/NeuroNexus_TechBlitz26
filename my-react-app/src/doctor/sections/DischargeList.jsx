import Badge from '../Badge';

const list = [
  { initials: 'SR', name: 'Sunita Rao', id: 'PT-008', condition: 'Stable angina', admitDate: '10 Mar', dischargeDate: '13 Mar', status: 'Ready' },
  { initials: 'KM', name: 'Karan Malhotra', id: 'PT-009', condition: 'Post-angioplasty', admitDate: '9 Mar', dischargeDate: '14 Mar', status: 'Pending docs' },
  { initials: 'FS', name: 'Fatima Sheikh', id: 'PT-010', condition: 'SVT resolved', admitDate: '11 Mar', dischargeDate: '13 Mar', status: 'Ready' },
];

const DischargeList = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-slate-900">Discharge list</h2>
      <p className="text-slate-500 text-sm mt-1">{list.length} patients pending discharge</p>
    </div>
    <div className="bg-white rounded-xl border border-[#3b82f633] overflow-hidden">
      <div className="grid grid-cols-5 px-5 py-3 bg-[#3b82f611] border-b border-[#3b82f633] text-xs font-semibold text-slate-500 uppercase tracking-wider">
        <span className="col-span-2">Patient</span>
        <span>Admitted</span>
        <span>Discharge</span>
        <span>Status</span>
      </div>
      {list.map((p, i, arr) => (
        <div key={i} className={`grid grid-cols-5 px-5 py-4 items-center ${i !== arr.length - 1 ? 'border-b border-[#3b82f633]' : ''}`}>
          <div className="col-span-2 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-800 flex items-center justify-center text-xs font-bold">{p.initials}</div>
            <div>
              <p className="text-sm font-medium text-slate-900">{p.name}</p>
              <p className="text-xs text-slate-500">{p.condition}</p>
            </div>
          </div>
          <span className="text-sm text-slate-600">{p.admitDate}</span>
          <span className="text-sm text-slate-600">{p.dischargeDate}</span>
          <Badge label={p.status} />
        </div>
      ))}
    </div>
  </div>
);

export default DischargeList;