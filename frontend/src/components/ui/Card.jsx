export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-xl
        border
        border-slate-200/90
        bg-white
        p-6
        shadow-xs
        hover:shadow-sm
        transition-all
        duration-200
        ${className}
      `}
    >
      {children}
    </div>
  );
}