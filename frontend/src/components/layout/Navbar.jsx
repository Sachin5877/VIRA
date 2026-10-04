import {
  Bell,
  Search,
  UserCircle2,
  ShieldCheck,
} from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-slate-200 bg-white px-8 flex items-center justify-between shrink-0">

      <div className="relative w-80">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          size={16}
        />
        <input
          type="text"
          placeholder="Search investigations, IOCs, alerts..."
          className="w-full rounded-lg bg-slate-50 border border-slate-200 py-2 pl-9 pr-3 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-medium text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          System Online
        </div>

        <button className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-600"></span>
        </button>

        <div className="h-5 w-[1px] bg-slate-200" />

        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-sm">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800 leading-tight">
              Administrator
            </p>
            <p className="text-xs text-slate-500">
              admin@vira.local
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}