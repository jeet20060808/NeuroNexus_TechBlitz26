import Badge from '../Badge';

const patientQueue = [
  { initials: 'VS', name: 'Vikram Shah', details: '10:00 • Chest pain, ECG abnormal', status: 'Critical', avatarColor: 'bg-red-100 text-red-700', dot: 'bg-red-500' },
  { initials: 'PM', name: 'Priya Mehta', details: '10:15 • Follow-up • Hypertension', status: 'Checked in', avatarColor: 'bg-yellow-100 text-yellow-700', dot: 'bg-yellow-500' },
  { initials: 'RK', name: 'Rahul Kumar', details: '10:30 • New patient • Palpitations', status: 'Scheduled', avatarColor: 'bg-slate-200 text-slate-800', dot: 'bg-teal-500' },
  { initials: 'NK', name: 'Neha Kapoor', details: '11:00 • Post-op review', status: 'Scheduled', avatarColor: 'bg-slate-200 text-slate-800', dot: 'bg-purple-500' },
  { initials: 'AS', name: 'Anil Sharma', details: '11:30 • Diabetes + cardiac risk', status: 'Lab pending', avatarColor: 'bg-yellow-100 text-yellow-700', dot: 'bg-green-500' },
];

const prescriptions = [
  { drug: 'Metoprolol 25mg', patient: 'Priya Mehta', details: '1 tab twice daily • 30 days', status: 'Signed', dot: 'bg-purple-400' },
  { drug: 'Atorvastatin 40mg', patient: 'Anil Sharma', details: '1 tab at night • 60 days', status: 'Pending', dot: 'bg-orange-400' },
  { drug: 'Losartan 50mg', patient: 'Neha Kapoor', details: '1 tab daily • 90 days', status: 'Signed', dot: 'bg-green-400' },
  { drug: 'Heparin IV', patient: 'Vikram Shah', details: '5000 IU stat • Emergency order', status: 'Urgent', dot: 'bg-blue-400' },
];

const labs = [
  { patient: 'Vikram Shah', test: 'Troponin I', result: '0.8 ng/mL', flag: 'High', flagColor: 'bg-red-100 text-red-700' },
  { patient: 'Anil Sharma', test: 'HbA1c', result: '8.4%', flag: 'Elevated', flagColor: 'bg-yellow-100 text-yellow-700' },
  { patient: 'Priya Mehta', test: 'INR', result: '2.1', flag: 'Normal', flagColor: 'bg-green-100 text-green-700' },
  { patient: 'Rahul Kumar', test: 'Chest X-ray', result: 'Clear', flag: 'Normal', flagColor: 'bg-green-100 text-green-700' },
  { patient: 'Neha Kapoor', test: 'Lipid panel', result: 'LDL 142', flag: 'Borderline', flagColor: 'bg-yellow-100 text-yellow-700' },
];

const referrals = [
  { patient: 'Vikram Shah', to: 'ICU / Cardio', reason: 'NSTEMI w/ instability' },
  { patient: 'Anil Sharma', to: 'Endocrinology', reason: 'DM management' },
  { patient: 'Rahul Kumar', to: 'Electrophysiology', reason: 'Palpitation workup' },
];

const MyDashboard = () => (
  <div className="p-8 max-w-[1400px] w-full grid grid-cols-12 gap-8 animate-in fade-in">
    <div className="col-span-8 space-y-8">

      {/* Patient Queue */}
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-lg font-bold text-[#1A3C40]">Patient Queue</h2>
          <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">Sort by urgency</span>
        </div>
        <div className="space-y-3">
          {patientQueue.map((p, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-2xl border border-slate-100 bg-slate-50/50 hover:bg-[#7C9070]/5 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className={`w-11 h-11 rounded-full ${p.avatarColor} flex items-center justify-center text-base font-bold shadow-sm`}>{p.initials}</div>
                <div>
                  <p className="text-[#1A3C40] font-bold text-sm group-hover:text-[#7C9070] transition-colors">{p.name}</p>
                  <p className="text-slate-500 text-xs mt-0.5">{p.details}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${p.dot}`} />
                <Badge label={p.status} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Prescriptions */}
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-6 shadow-sm">
        <h3 className="font-bold text-[#1A3C40] mb-4">Recent prescriptions</h3>
        <div className="grid grid-cols-2 gap-4">
          {prescriptions.map((pr, i) => (
            <div key={i} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#7C9070]/30 transition-all shadow-sm">
              <div className="flex justify-between items-start mb-1">
                <p className="text-[#1A3C40] font-bold text-sm">{pr.drug}</p>
                <Badge label={pr.status} />
              </div>
              <p className="text-slate-500 text-xs mb-2">{pr.patient}</p>
              <div className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${pr.dot}`} />
                <p className="text-slate-600 text-[11px] font-medium">{pr.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="col-span-4 space-y-8">
      {/* Lab Results */}
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-5 shadow-sm">
        <h3 className="font-bold text-[#1A3C40] mb-4">Lab & radiology results</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-xs border-b border-slate-100">
              <th className="pb-2 font-medium">Patient</th>
              <th className="pb-2 font-medium">Test</th>
              <th className="pb-2 font-medium">Result</th>
              <th className="pb-2 font-medium text-right">Flag</th>
            </tr>
          </thead>
          <tbody>
            {labs.map((l, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="py-2.5 text-slate-700 text-xs pr-1 font-medium">{l.patient}</td>
                <td className="py-2.5 text-slate-600 text-xs pr-1">{l.test}</td>
                <td className="py-2.5 text-[#1A3C40] text-xs pr-1 font-bold">{l.result}</td>
                <td className="py-2.5 text-right">
                  <span className={`${l.flagColor} text-[10px] px-2 py-0.5 rounded font-bold`}>{l.flag}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Referrals */}
      <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-5 shadow-sm">
        <h3 className="font-bold text-[#1A3C40] mb-4">Referrals</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-slate-500 text-xs border-b border-slate-100">
              <th className="pb-2 font-medium">Patient</th>
              <th className="pb-2 font-medium">Referred to</th>
              <th className="pb-2 font-medium">Reason</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((r, i) => (
              <tr key={i} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                <td className="py-2.5 text-slate-700 text-xs font-medium">{r.patient}</td>
                <td className="py-2.5 text-slate-600 text-xs">{r.to}</td>
                <td className="py-2.5 text-slate-500 text-xs truncate max-w-[100px]">{r.reason}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

export default MyDashboard;