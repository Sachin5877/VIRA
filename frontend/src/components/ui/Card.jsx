export default function Card({ children, className = "" }) {
  return (
    <div
      className={`
        rounded-2xl
        border
        border-[#334155]
        bg-[#1B263B]
        p-6
        shadow-lg
        transition-all
        duration-300
        hover:border-[#14B8A6]
        hover:shadow-xl
        ${className}
      `}
    >
      {children}
    </div>
  );
}