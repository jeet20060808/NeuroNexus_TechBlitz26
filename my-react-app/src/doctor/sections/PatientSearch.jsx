import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { api } from '../../api';

const PatientSearch = () => {
  const [query, setQuery] = useState('');
  const [allPatients, setAllPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getPatients()
      .then(data => {
        setAllPatients(data.patients || []);
        setLoading(false);
      })
      .catch(err => {
        console.error("Failed to load patients for search:", err);
        setLoading(false);
      });
  }, []);

  const results = query.length > 0
    ? allPatients.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        (p.id && p.id.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  return (
    <div className="p-8 max-w-3xl animate-in fade-in">
      <div className="mb-6">
        <h2 className="text-3xl font-serif text-[#1A3C40]">Patient Search</h2>
        <p className="text-[#7C9070] text-sm mt-1 font-bold uppercase tracking-widest">Access clinical records instantly</p>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#7C9070]" size={20} />
        <input
          autoFocus
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by name, ID or phone..."
          className="w-full bg-white border border-[#7C9070]/20 rounded-3xl py-5 pl-14 pr-4 text-base text-[#1A3C40] outline-none focus:border-[#7C9070] shadow-sm transition-all focus:ring-8 focus:ring-[#7C9070]/5 placeholder-slate-300"
        />
      </div>

      {loading ? (
        <p className="text-center text-slate-400 text-sm py-16">Loading registry...</p>
      ) : (
        <>
          {query.length === 0 && (
            <div className="text-center py-20 px-8 bg-slate-50 border border-dashed border-slate-200 rounded-[40px]">
              <p className="text-slate-400 text-sm font-medium">Global Patient Registry</p>
              <p className="text-slate-300 text-xs mt-1">Start typing to search across all hospital records</p>
            </div>
          )}
          
          {query.length > 0 && results.length === 0 && (
            <p className="text-center text-slate-400 text-sm py-16 italic">No patients matching "{query}"</p>
          )}

          {results.length > 0 && (
            <div className="bg-white rounded-[32px] border border-[#7C9070]/20 overflow-hidden shadow-sm">
              {results.map((p, i, arr) => (
                <div key={p.id} className={`flex items-center gap-5 px-8 py-5 hover:bg-[#7C9070]/5 cursor-pointer transition-all ${i !== arr.length - 1 ? 'border-b border-slate-50' : ''}`}>
                  <div className="w-12 h-12 rounded-2xl bg-[#7C9070]/10 text-[#7C9070] flex items-center justify-center text-sm font-black flex-shrink-0 uppercase">
                    {p.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-base font-bold text-[#1A3C40]">{p.name}</p>
                      <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded font-black uppercase tracking-tight">
                        ID: {p.id.split('-')[0]}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1 font-medium">{p.gender} · {p.phone || 'No phone'}</p>
                  </div>
                  <button className="text-[10px] font-black uppercase tracking-widest text-[#7C9070] hover:text-[#1A3C40] transition-colors">
                    View Registry
                  </button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PatientSearch;