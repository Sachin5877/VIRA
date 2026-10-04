import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";
import { AlertTriangle } from "lucide-react";

export default function RecentAlerts() {

  const { stats } = useDashboard();

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">
            Recent Alerts
          </h2>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Live feed
        </span>
      </div>

      <div className="mt-4 space-y-2.5 flex-1 overflow-y-auto">
        {!stats.recentAlerts || stats.recentAlerts.length === 0 ? (
          <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-6 text-center text-xs text-slate-500">
            No active threat alerts detected.
          </div>
        ) : (
          stats.recentAlerts.map((alert, index) => {
            const isHigh = alert.severity?.toLowerCase() === "high" || alert.severity?.toLowerCase() === "critical";
            return (
              <div
                key={index}
                className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3 transition-all duration-150 hover:bg-white hover:border-slate-300 hover:shadow-xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="font-semibold text-xs text-slate-900 truncate">
                    {alert.event}
                  </p>
                  <span
                    className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isHigh
                        ? "bg-red-50 text-red-700 border border-red-200"
                        : "bg-amber-50 text-amber-700 border border-amber-200"
                    }`}
                  >
                    {alert.severity}
                  </span>
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="font-mono text-slate-600 bg-white px-1.5 py-0.5 rounded border border-slate-200">
                    {alert.ip}
                  </span>
                  <span>Detected now</span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}