export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}) {
  return (
    <div className="rounded-2xl border border-[#334155] bg-[#1B263B] p-6 transition-all duration-300 hover:border-[#14B8A6] hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-[#94A3B8]">
            {title}
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#F8FAFC]">
            {value}
          </h2>

          <p className="mt-2 text-sm text-[#94A3B8]">
            {subtitle}
          </p>

        </div>

        <div className="text-[#14B8A6]">
          {icon}
        </div>

      </div>

    </div>
  );
}