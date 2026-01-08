export function StatCard({
  icon,
  label,
  value,
  color,
}: {
  icon: string;
  label: string;
  value: any;
  color: string;
}) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className={`text-xl mb-1 ${color}`}>{icon}</span>
      <p className="text-xs font-medium text-slate-600 uppercase mb-2">
        {label}
      </p>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
    </div>
  );
}
