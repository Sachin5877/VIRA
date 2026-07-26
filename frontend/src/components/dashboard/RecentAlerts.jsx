import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";

export default function RecentAlerts() {
  const { stats } = useDashboard();

  return (
    <Card>
      <h2 className="text-xl font-semibold text-white">
        Recent Alerts
      </h2>

      <div className="mt-6 space-y-4">

        {stats.recentAlerts.length === 0 ? (

          <div className="rounded-xl bg-slate-900 p-4 text-slate-400">
            No alerts detected.
          </div>

        ) : (

          stats.recentAlerts.map((alert, index) => (

            <div
              key={index}
              className="rounded-xl border border-slate-800 bg-slate-900 p-4"
            >
              <p className="font-semibold text-red-400">
                {alert.event}
              </p>

              <p className="mt-1 text-sm text-slate-300">
                Severity: {alert.severity}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Source IP: {alert.ip}
              </p>

            </div>

          ))

        )}

      </div>
    </Card>
  );
}