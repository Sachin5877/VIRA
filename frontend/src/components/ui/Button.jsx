export default function Button({
  children,
  onClick,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      className={`
        rounded-xl
        bg-[#14B8A6]
        px-5
        py-3
        font-medium
        text-white
        transition-all
        duration-300
        hover:bg-[#10B981]
        hover:shadow-lg
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}