import Badge from '../Badge';

const MedicalHistory = () => (
  <div className="p-8 max-w-4xl animate-in fade-in">
    <div className="mb-6">
      <h2 className="text-3xl font-serif text-[#1A3C40]">Patient Medical History</h2>
      <p className="text-slate-500 text-sm mt-1">Access comprehensive history of your patients.</p>
    </div>
    <div className="bg-white rounded-[32px] border border-[#7C9070]/20 p-12 text-center shadow-sm">
        <p className="text-slate-400 italic">No medical records found.</p>
    </div>
  </div>
);

export default MedicalHistory;