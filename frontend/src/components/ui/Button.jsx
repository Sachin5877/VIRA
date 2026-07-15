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
        bg-blue-600
        px-5
        py-3
        font-medium
        text-white
        transition-all
        duration-300
        hover:bg-blue-500
        active:scale-95
        ${className}
      `}
    >
      {children}
    </button>
  );
}