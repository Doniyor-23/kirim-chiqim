import Card from './Card';

export default function StatCard({ label, value, icon, trendLabel, accent = 'indigo' }) {
  const accents = {
    indigo: 'text-indigo-400 bg-indigo-500/10',
    emerald: 'text-emerald-400 bg-emerald-500/10',
    rose: 'text-rose-400 bg-rose-500/10',
    amber: 'text-amber-400 bg-amber-500/10',
  };

  return (
    <Card hover className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-400 font-medium">{label}</span>
        <div className={`p-2 rounded-xl ${accents[accent]}`}>{icon}</div>
      </div>
      <div>
        <p className="text-2xl font-bold text-slate-50">{value}</p>
        {trendLabel && <p className="text-xs text-slate-500 mt-1">{trendLabel}</p>}
      </div>
    </Card>
  );
}
