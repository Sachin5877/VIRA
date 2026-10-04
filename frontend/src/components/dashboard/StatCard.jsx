export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="rounded-xl border border-slate-200/90 bg-white p-5 shadow-xs transition-all duration-200 hover:border-slate-300 hover:shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
            {value}
          </h2>

          <p className="mt-1.5 text-xs text-slate-500">
            {subtitle}
          </p>
        </div>

        <div className="h-12 w-12 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );
}