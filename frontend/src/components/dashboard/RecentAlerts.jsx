import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";

export default function RecentAlerts() {

  const { stats } = useDashboard();

  return (
    <Card>

      <h2 className="text-xl font-semibold text-[#F8FAFC]">
        Recent Alerts
      </h2>

      <div className="mt-6 space-y-4">

        {stats.recentAlerts.length === 0 ? (

          <div className="rounded-xl bg-[#111827] p-4 text-[#94A3B8]">
            No alerts detected.
          </div>

        ) : (

          stats.recentAlerts.map((alert, index) => (

            <div
              key={index}
              className="rounded-xl border border-[#334155] bg-[#111827] p-4 transition-all duration-300 hover:border-[#14B8A6]"
            >

              <p className="font-semibold text-[#EF4444]">
                {alert.event}
              </p>

              <p className="mt-1 text-sm text-[#CBD5E1]">
                Severity : {alert.severity}
              </p>

              <p className="mt-1 text-xs text-[#94A3B8]">
                Source IP : {alert.ip}
              </p>

            </div>

          ))

        )}

      </div>

    </Card>
  );
}