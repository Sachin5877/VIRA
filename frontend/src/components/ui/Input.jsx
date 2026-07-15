export default function Input(props) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-slate-700
        bg-slate-900
        px-4
        py-3
        text-white
        outline-none
        transition-all
        duration-300
        focus:border-blue-500
      "
    />
  );
}