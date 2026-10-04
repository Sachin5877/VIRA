export default function Input(props) {
  return (
    <input
      {...props}
      className={`
        w-full
        rounded-lg
        border
        border-slate-200
        bg-white
        px-3.5
        py-2.5
        text-sm
        text-slate-900
        outline-none
        transition-all
        duration-150
        placeholder:text-slate-400
        focus:border-blue-500
        focus:ring-2
        focus:ring-blue-100
        ${props.className || ""}
      `}
    />
  );
}