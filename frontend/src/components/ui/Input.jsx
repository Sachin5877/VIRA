export default function Input(props) {
  return (
    <input
      {...props}
      className="
        w-full
        rounded-xl
        border
        border-[#334155]
        bg-[#111827]
        px-4
        py-3
        text-[#F8FAFC]
        outline-none
        transition-all
        duration-300
        placeholder:text-[#94A3B8]
        focus:border-[#14B8A6]
      "
    />
  );
}