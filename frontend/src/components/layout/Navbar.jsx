import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-[#334155] bg-[#111827] px-8 flex items-center justify-between">

      <div className="relative w-96">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]"
          size={18}
        />

        <input
          type="text"
          placeholder="Search investigations..."
          className="w-full rounded-xl bg-[#0B1220] border border-[#334155] py-3 pl-11 pr-4 text-[#F8FAFC] outline-none transition-all focus:border-[#14B8A6]"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="cursor-pointer text-[#CBD5E1] hover:text-[#14B8A6] transition"
          size={22}
        />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={38}
            className="text-[#14B8A6]"
          />

          <div>

            <p className="font-semibold text-[#F8FAFC]">
              Administrator
            </p>

            <p className="text-sm text-[#94A3B8]">
              admin@vira.local
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}