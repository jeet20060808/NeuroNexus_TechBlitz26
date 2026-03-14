const STYLES = {
  critical:     'bg-red-100 text-red-700',
  urgent:       'bg-red-100 text-red-700',
  severe:       'bg-red-100 text-red-700',
  due:          'bg-red-100 text-red-700',
  pending:      'bg-yellow-100 text-yellow-700',
  'lab pending':'bg-yellow-100 text-yellow-700',
  'pending docs':'bg-yellow-100 text-yellow-700',
  moderate:     'bg-yellow-100 text-yellow-700',
  'checked in': 'bg-yellow-100 text-yellow-700',
  elevated:     'bg-yellow-100 text-yellow-700',
  borderline:   'bg-yellow-100 text-yellow-700',
  signed:       'bg-green-100 text-green-700',
  confirmed:    'bg-green-100 text-green-700',
  stable:       'bg-green-100 text-green-700',
  ready:        'bg-green-100 text-green-700',
  normal:       'bg-green-100 text-green-700',
  'up to date': 'bg-green-100 text-green-700',
  controlled:   'bg-green-100 text-green-700',
  mild:         'bg-green-100 text-green-700',
  sent:         'bg-slate-200 text-slate-700',
  scheduled:    'bg-slate-200 text-slate-700',
  routine:      'bg-slate-200 text-slate-700',
  cancelled:    'bg-slate-200 text-slate-600',
  monitored:    'bg-blue-100 text-blue-700',
  high:         'bg-red-100 text-red-700',
};

const Badge = ({ label }) => {
  const style = STYLES[label?.toLowerCase()] || 'bg-slate-200 text-slate-700';
  return (
    <span className={`text-[10px] px-2 py-1 rounded font-bold tracking-tight whitespace-nowrap ${style}`}>
      {label}
    </span>
  );
};

export default Badge;