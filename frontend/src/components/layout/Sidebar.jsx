import navigation from "../../data/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";

export default function Sidebar() {

  const navigate = useNavigate();

  const location = useLocation();

  const { stats } = useDashboard();

  return (

    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-2xl font-bold text-white">
          VIRA
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Intelligent Security Investigation Platform
        </p>

      </div>

      <nav className="flex-1 p-4">

        {navigation.map((item) => {

          const Icon = item.icon;

          let badge = null;

          if (item.name === "Dashboard")
            badge = stats.securityScore;

          if (item.name === "Upload Logs")
            badge = stats.uploadedFiles;

          if (item.name === "Investigation")
            badge = stats.investigations;

          if (item.name === "Reports")
            badge = stats.reports;

          if (item.name === "Alerts")
            badge = stats.highAlerts;

          return (

            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full mb-2 flex items-center justify-between rounded-xl px-4 py-3 transition-all

              ${
                location.pathname === item.path
                  ? "bg-cyan-600 text-white"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >

              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span>{item.name}</span>

              </div>

              {badge !== null && (

                <div className="rounded-full bg-slate-800 px-2 py-1 text-xs text-cyan-400">

                  {badge}

                </div>

              )}

            </button>

          );

        })}

      </nav>

      <div className="border-t border-slate-800 p-5">

        <div className="font-semibold text-white">

          Admin

        </div>

        <div className="text-sm text-slate-400">

          Administrator

        </div>

      </div>

    </aside>

  );

}