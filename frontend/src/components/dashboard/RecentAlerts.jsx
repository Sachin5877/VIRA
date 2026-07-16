import alerts from "../../data/alerts";
import Card from "../ui/Card";

const severityColors = {
  Critical: "bg-red-500",
  High: "bg-orange-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500",
};

export default function RecentAlerts() {
  return (
    <Card className="h-full">
      <h2 className="text-xl font-semibold text-white">
        Recent Alerts
      </h2>

      <div className="mt-6 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="rounded-xl border border-slate-800 bg-slate-950 p-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span
                  className={`h-3 w-3 rounded-full ${severityColors[alert.severity]}`}
                ></span>

                <div>
                  <p className="font-medium text-white">
                    {alert.title}
                  </p>

                  <p className="text-sm text-slate-400">
                    {alert.source}
                  </p>
                </div>
              </div>

              <span className="text-xs text-slate-500">
                {alert.time}
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}