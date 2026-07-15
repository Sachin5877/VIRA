import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-20 border-b border-slate-800 bg-slate-900 px-8 flex items-center justify-between">

      <div className="relative w-96">

        <Search
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
          size={18}
        />

        <input
          type="text"
          placeholder="Search investigations..."
          className="w-full rounded-xl bg-slate-950 border border-slate-700 py-3 pl-11 pr-4 text-white outline-none focus:border-blue-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <Bell
          className="text-slate-300 cursor-pointer hover:text-blue-400 transition"
          size={22}
        />

        <div className="flex items-center gap-3">

          <UserCircle2
            size={38}
            className="text-blue-400"
          />

          <div>

            <p className="font-semibold text-white">
              Administrator
            </p>

            <p className="text-sm text-slate-400">
              admin@vira.local
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}