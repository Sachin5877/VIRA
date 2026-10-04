import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  UploadCloud,
  BrainCircuit,
  FileCheck2,
  Bell,
  Search,
  LogOut,
  ChevronDown,
  Activity,
  CheckCircle2,
  Radio,
  ExternalLink,
  Command,
  Flame,
  FileText
} from "lucide-react";
import { useNotifications } from "../context/NotificationContext";
import { useDashboard } from "../context/DashboardContext";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { notifications, removeNotification } = useNotifications();
  const { stats } = useDashboard();
  const [showNotifications, setShowNotifications] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("vira_user");
      if (stored) {
        setUser(JSON.parse(stored));
      } else {
        setUser({
          username: "lead_analyst",
          full_name: "Lead Security Investigator",
          role: "SecOps Tier 3",
        });
      }
    } catch {
      setUser({
        username: "lead_analyst",
        full_name: "Lead Security Investigator",
        role: "SecOps Tier 3",
      });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("vira_user");
    navigate("/login");
  };

  const navItems = [
    {
      name: "Command Surface",
      to: "/",
      icon: LayoutDashboard,
      badge: stats.highAlerts > 0 ? `${stats.highAlerts} Alerts` : null,
      badgeColor: "bg-rose-100 text-rose-700 border-rose-200",
    },
    {
      name: "Log Ingestion",
      to: "/upload",
      icon: UploadCloud,
      badge: stats.uploadedFiles ? `${stats.uploadedFiles} Files` : null,
      badgeColor: "bg-blue-100 text-blue-700 border-blue-200",
    },
    {
      name: "AI Copilot",
      to: "/chat",
      icon: BrainCircuit,
      badge: "VIRA AI",
      badgeColor: "bg-indigo-100 text-indigo-700 border-indigo-200",
    },
    {
      name: "Incident Dossier",
      to: "/report",
      icon: FileCheck2,
      badge: stats.reports ? `${stats.reports}` : null,
      badgeColor: "bg-emerald-100 text-emerald-700 border-emerald-200",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 flex flex-col antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL COMMAND CENTER HEADER                                       */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200/90 shadow-xs">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            
            {/* BRAND & PLATFORM IDENTITY */}
            <div className="flex items-center gap-3 shrink-0">
              <NavLink to="/" className="flex items-center gap-2.5 group">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-md shadow-blue-500/25 group-hover:scale-105 transition">
                  <Shield size={22} strokeWidth={2.4} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black tracking-tight text-slate-900 leading-none">
                      VIRA
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-white px-1.5 py-0.5 rounded">
                      SOC CORE
                    </span>
                  </div>
                  <p className="text-[11px] font-medium text-slate-500 tracking-tight leading-tight mt-0.5">
                    Autonomous Threat Investigation
                  </p>
                </div>
              </NavLink>
            </div>

            {/* PRIMARY WORKSPACE NAVIGATION TABS (Command Bar Concept) */}
            <nav className="hidden md:flex items-center gap-1.5 bg-slate-100/90 p-1 rounded-xl border border-slate-200/80">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.to || 
                  (item.to !== "/" && location.pathname.startsWith(item.to));

                return (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-150 relative ${
                      isActive
                        ? "bg-white text-blue-700 shadow-xs border border-slate-200/80 font-bold"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                    }`}
                  >
                    <Icon size={16} className={isActive ? "text-blue-600" : "text-slate-400"} />
                    <span>{item.name}</span>
                    {item.badge && (
                      <span className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-md border ${item.badgeColor}`}>
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* QUICK ACTIONS & SYSTEM TELEMETRY */}
            <div className="flex items-center gap-3">
              {/* SYSTEM LIVE INDICATOR */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200/70 rounded-lg text-emerald-800 text-xs font-medium">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[11px] font-mono font-semibold tracking-wide">SOC-1 // ONLINE</span>
              </div>

              {/* QUICK INGEST SHORTCUT */}
              <button
                onClick={() => navigate("/upload")}
                className="hidden sm:inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3.5 py-2 rounded-lg shadow-xs shadow-blue-500/20 transition cursor-pointer"
              >
                <UploadCloud size={15} />
                <span>Ingest Log</span>
              </button>

              {/* NOTIFICATIONS POPOVER BUTTON */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer border border-transparent hover:border-slate-200"
                  title="Notifications"
                >
                  <Bell size={18} />
                  {notifications.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                    </span>
                  )}
                </button>

                {/* NOTIFICATIONS DROPDOWN */}
                {showNotifications && (
                  <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-xl border border-slate-200 p-4 z-50">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Bell size={16} className="text-blue-600" />
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Security Telemetry Events
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {notifications.length} Active
                      </span>
                    </div>

                    <div className="mt-3 max-h-72 overflow-y-auto space-y-2">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-slate-400">
                          No pending security alerts
                        </div>
                      ) : (
                        notifications.map((n) => (
                          <div
                            key={n.id}
                            className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs flex items-start justify-between gap-2"
                          >
                            <div>
                              <p className="font-semibold text-slate-800">{n.title}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">{n.message}</p>
                            </div>
                            <button
                              onClick={() => removeNotification(n.id)}
                              className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* OPERATOR PROFILE & LOGOUT */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="hidden sm:block text-right">
                  <p className="text-xs font-bold text-slate-900 leading-tight">
                    {user?.full_name || "SecOps Analyst"}
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 leading-tight">
                    {user?.role || "Incident Responder"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                  title="Sign Out of Terminal"
                >
                  <LogOut size={17} />
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* MOBILE NAVIGATION BAR (When screen width < md) */}
        <div className="md:hidden border-t border-slate-200 bg-slate-50 px-4 py-2 flex items-center justify-around">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.to;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-1 px-2 text-[10px] font-semibold ${
                  isActive ? "text-blue-600 font-bold" : "text-slate-500"
                }`}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. CONTEXTUAL INCIDENT TELEMETRY STRIP (Dynamic HUD Banner)               */}
      {/* ========================================================================= */}
      <div className="bg-white border-b border-slate-200/70 py-2 px-4 sm:px-6 lg:px-8 shadow-2xs">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-4 text-slate-600">
            <span className="flex items-center gap-1.5 font-medium">
              <Activity size={14} className="text-blue-600" />
              <span className="text-slate-400">Environment:</span>
              <span className="font-semibold text-slate-800">Production SOC Cluster</span>
            </span>

            <span className="hidden sm:inline-block h-3.5 w-px bg-slate-200" />

            <span className="hidden sm:flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">Ingested Logs:</span>
              <span className="font-bold text-slate-900 font-mono">{stats.totalLogs || 0}</span>
            </span>

            <span className="hidden md:inline-block h-3.5 w-px bg-slate-200" />

            <span className="hidden md:flex items-center gap-1.5 font-medium">
              <span className="text-slate-400">Threat Score:</span>
              <span className={`font-bold font-mono px-1.5 py-0.2 rounded text-[11px] ${
                stats.highAlerts > 0 ? "bg-rose-100 text-rose-700" : "bg-emerald-100 text-emerald-700"
              }`}>
                {stats.securityScore || 85}/100
              </span>
            </span>
          </div>

          <div className="flex items-center gap-3 text-[11px] font-mono text-slate-500">
            <span className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
              <Radio size={12} className="text-blue-500 animate-pulse" />
              <span>AI COGNITIVE ENGINE ACTIVE</span>
            </span>
            <span className="hidden sm:inline-block text-slate-400">
              UTC: {new Date().toISOString().slice(11, 19)}
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. MAIN WORKSPACE OUTLET                                                  */}
      {/* ========================================================================= */}
      <main className="flex-1 max-w-[1720px] w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* ========================================================================= */}
      {/* 4. PROFESSIONAL COMPACT FOOTER                                           */}
      {/* ========================================================================= */}
      <footer className="bg-white border-t border-slate-200 py-3 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-[1720px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-blue-600" />
            <span className="font-bold text-slate-700">VIRA Threat Intelligence Platform</span>
            <span className="text-slate-300">|</span>
            <span>Commercial SecOps & Autonomous Log Forensics</span>
          </div>
          <div className="font-mono text-[11px] text-slate-400">
            CONFIDENTIAL SOC ACCESS · STRICT AUDIT LOGGING ENABLED
          </div>
        </div>
      </footer>
    </div>
  );
}