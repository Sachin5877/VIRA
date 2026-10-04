import navigation from "../../data/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";
import { ShieldCheck } from "lucide-react";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stats } = useDashboard();

  return (
    <aside className="w-64 h-screen bg-white border-r border-slate-200 flex flex-col shrink-0 select-none">

      <div className="p-5 border-b border-slate-200/80 flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/30">
          <ShieldCheck size={22} className="stroke-[2.5]" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-tight">
            VIRA
          </h1>
          <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
            SecOps Suite
          </p>
        </div>
      </div>

      <div className="px-4 pt-4 pb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
        Navigation
      </div>

      <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          let badge = null;
          if (item.name === "Dashboard") badge = stats.securityScore;
          if (item.name === "Upload Logs") badge = stats.uploadedFiles;
          if (item.name === "Investigation") badge = stats.investigations;
          if (item.name === "Reports") badge = stats.reports;
          if (item.name === "Alerts") badge = stats.highAlerts;

          return (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-semibold shadow-xs"
                  : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  size={18}
                  className={isActive ? "text-blue-600 stroke-[2.2]" : "text-slate-400 group-hover:text-slate-600"}
                />
                <span>{item.name}</span>
              </div>

              {badge !== null && badge !== undefined && (
                <span
                  className={`rounded-md px-2 py-0.5 text-xs font-semibold ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-600 border border-slate-200/80"
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-200/80 p-4 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center border border-blue-200">
            AD
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold text-slate-800 truncate">
              Security Admin
            </div>
            <div className="text-xs text-slate-500 truncate">
              Enterprise SOC Tier 1
            </div>
          </div>
        </div>
      </div>

    </aside>
  );
}