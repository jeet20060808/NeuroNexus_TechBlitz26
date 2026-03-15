const NAV_GROUPS = [
  {
    group: 'Clinic',
    items: [
      { label: 'My dashboard', dot: 'bg-green-500' },
      { label: "Today's patients", dot: 'bg-orange-500' },
      { label: 'My schedule', dot: 'bg-blue-500' },
    ],
  },
  {
    group: 'Patients',
    items: [
      { label: 'Patient search', dot: 'bg-gray-500' },
      { label: 'Active cases', dot: 'bg-gray-500' },
      { label: 'Critical / ICU', dot: 'bg-red-500' },
      { label: 'Discharge list', dot: 'bg-gray-500' },
    ],
  },
  {
    group: 'Clinical',
    items: [
      { label: 'Write notes', dot: 'bg-gray-500' },
      { label: 'Prescriptions', dot: 'bg-gray-500' },
      { label: 'Pending results', dot: 'bg-red-500' },
      { label: 'Referrals', dot: 'bg-gray-500' },
    ],
  },
  {
    group: 'Records',
    items: [
      { label: 'Medical history', dot: 'bg-gray-500' },
      { label: 'Immunizations', dot: 'bg-gray-500' },
      { label: 'Allergies & alerts', dot: 'bg-gray-500' },
    ],
  },
];

const Sidebar = ({ currentTab, setCurrentTab }) => (
  <aside className="w-64 bg-white h-screen fixed flex flex-col border-r border-[#7C9070]/20 z-20">
    <div className="flex-1 overflow-y-auto py-6 px-3">
      {NAV_GROUPS.map(({ group, items }) => (
        <div key={group} className="mb-6">
          <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-2 ml-2">
            {group}
          </p>
          <ul className="space-y-0.5">
            {items.map(({ label, dot }) => (
              <li
                key={label}
                onClick={() => setCurrentTab(label)}
                className={`px-3 py-2 rounded-md cursor-pointer flex items-center gap-3 text-sm transition-colors ${
                  currentTab === label
                    ? 'bg-[#7C9070]/10 text-[#1A3C40] font-bold'
                    : 'text-slate-700 hover:bg-[#7C9070]/5'
                }`}
              >
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />
                {label}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </aside>
);

export default Sidebar;