export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-slate-800
        bg-slate-900
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:border-blue-500/40
        hover:shadow-blue-500/10
        ${className}
      `}
    >
      {children}
    </div>
  );
}