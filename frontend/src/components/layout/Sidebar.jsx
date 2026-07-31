import navigation from "../../data/navigation";
import { useNavigate, useLocation } from "react-router-dom";
import { useDashboard } from "../../context/DashboardContext";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { stats } = useDashboard();

  return (
    <aside className="w-72 h-screen bg-[#111827] border-r border-[#334155] flex flex-col">

      <div className="p-6 border-b border-[#334155]">

        <h1 className="text-3xl font-extrabold tracking-wide text-[#14B8A6]">
          VIRA
        </h1>

        <p className="mt-2 text-sm text-[#94A3B8]">
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
              className={`w-full mb-2 flex items-center justify-between rounded-xl px-4 py-3 transition-all duration-300

              ${
                location.pathname === item.path
                  ? "bg-[#14B8A6] text-white shadow-lg"
                  : "text-[#CBD5E1] hover:bg-[#1B263B] hover:text-[#14B8A6]"
              }`}
            >

              <div className="flex items-center gap-3">

                <Icon size={20} />

                <span>{item.name}</span>

              </div>

              {badge !== null && (

                <div className="rounded-full bg-[#0B1220] px-2 py-1 text-xs font-semibold text-[#14B8A6]">

                  {badge}

                </div>

              )}

            </button>

          );

        })}

      </nav>

      <div className="border-t border-[#334155] p-5">

        <div className="font-semibold text-[#F8FAFC]">
          Admin
        </div>

        <div className="text-sm text-[#94A3B8]">
          Administrator
        </div>

      </div>

    </aside>
  );
}