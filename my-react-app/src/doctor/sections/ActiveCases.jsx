import Badge from '../Badge';

const cases = [
  { initials: 'VS', name: 'Vikram Shah', id: 'PT-001', condition: 'NSTEMI', ward: 'CCU Bed 3', days: 2, severity: 'Critical', avatarColor: 'bg-[#8B3A3A] text-red-200' },
  { initials: 'AS', name: 'Anil Sharma', id: 'PT-005', condition: 'Diabetes + cardiac risk', ward: 'Ward B Bed 7', days: 1, severity: 'Moderate', avatarColor: 'bg-[#8B7322] text-yellow-200' },
  { initials: 'PM', name: 'Priya Mehta', id: 'PT-002', condition: 'Hypertension', ward: 'OPD', days: 0, severity: 'Stable', avatarColor: 'bg-[#2E603A] text-green-200' },
  { initials: 'NK', name: 'Neha Kapoor', id: 'PT-004', condition: 'Post-op cardiac', ward: 'Ward A Bed 2', days: 4, severity: 'Stable', avatarColor: 'bg-[#2E603A] text-green-200' },
  { initials: 'DP', name: 'Dev Patel', id: 'PT-007', condition: 'Heart failure', ward: 'CCU Bed 5', days: 6, severity: 'Critical', avatarColor: 'bg-[#8B3A3A] text-red-200' },
];

const ActiveCases = () => (
  <div className="p-8 max-w-4xl">
    <div className="mb-6">
      <h2 className="text-xl font-semibold text-white">Active cases</h2>
      <p className="text-gray-500 text-sm mt-1">{cases.length} patients currently under your care</p>
    </div>
    <div className="space-y-3">
      {cases.map((c, i) => (
        <div key={i} className="bg-[#2A2A2A] rounded-xl border border-[#333333] px-5 py-4 flex items-center gap-4 hover:border-[#444] transition-colors cursor-pointer">
          <div className={`w-10 h-10 rounded-full ${c.avatarColor} flex items-center justify-center text-sm font-bold flex-shrink-0`}>{c.initials}</div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-white">{c.name}</p>
              <span className="text-xs text-gray-600">{c.id}</span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">{c.condition} · {c.ward}</p>
          </div>
          <div className="text-right">
            <Badge label={c.severity} />
            <p className="text-xs text-gray-600 mt-1.5">{c.days === 0 ? 'Admitted today' : `Day ${c.days}`}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default ActiveCases;