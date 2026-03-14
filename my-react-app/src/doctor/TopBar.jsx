import { LogOut } from 'lucide-react';

const TopBar = ({ user, onLogout }) => (
  <header className="h-16 flex items-center justify-between px-8 border-b border-[#3b82f633] sticky top-0 bg-[#3b82f633] z-10">
    <div className="flex items-center gap-4">
      <h1 className="text-xl font-semibold text-slate-900">ClinicalDesk — Cardiology</h1>
      <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded font-bold">2 Critical</span>
      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded font-bold">On Ward Round</span>
    </div>
    <div className="flex items-center gap-4">
      <span className="text-sm text-slate-600">
        Fri 13 Mar 2026 <span className="text-slate-900 ml-1">10:42 AM</span>
      </span>
      <div
        className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onLogout}
      >
        <div className="w-8 h-8 bg-blue-100 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
          {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2) || 'VS'}
        </div>
        <LogOut size={16} className="text-slate-500" />
      </div>
    </div>
  </header>
);

export default TopBar;