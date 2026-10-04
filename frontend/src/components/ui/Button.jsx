export default function Button({
  children,
  onClick,
  className = "",
  disabled = false,
  variant = "primary",
}) {
  const baseStyles = "rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-150 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variantStyles = variant === "secondary"
    ? "bg-white text-slate-700 border border-slate-300 hover:bg-slate-50 hover:text-slate-900 shadow-xs"
    : "bg-blue-600 text-white hover:bg-blue-700 shadow-xs shadow-blue-500/20";

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variantStyles}
        ${className}
      `}
    >
      {children}
    </button>
  );
}