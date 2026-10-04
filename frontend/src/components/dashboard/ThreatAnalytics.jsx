import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const COLORS = [
  "#2563eb", // blue
  "#10b981", // emerald
  "#f59e0b", // amber
  "#ef4444", // red
  "#6366f1", // indigo
];

export default function ThreatAnalytics() {

  const { stats } = useDashboard();

  const eventData = Object.entries(
    stats.eventDistribution || {}
  ).map(([event, count]) => ({
    event,
    count,
  }));

  const severityData = Object.entries(
    stats.severityDistribution || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card>
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Threat Analytics
          </h2>
          <p className="text-xs text-slate-500">
            Distribution across security telemetry and posture assessment
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">

        {/* Event Distribution */}
        <div className="h-80 rounded-xl bg-slate-50/50 border border-slate-200/90 p-4 flex flex-col">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Event Types Distribution
          </h3>

          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={eventData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="event"
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <YAxis
                  stroke="#64748b"
                  fontSize={11}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                    color: "#0f172a",
                  }}
                />
                <Bar
                  dataKey="count"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Severity */}
        <div className="h-80 rounded-xl bg-slate-50/50 border border-slate-200/90 p-4 flex flex-col">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-600">
            Severity Classification
          </h3>

          <div className="flex-1 w-full min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={severityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={4}
                >
                  {severityData.map((entry, index) => (
                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#ffffff",
                    borderColor: "#e2e8f0",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    fontSize: "12px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score */}
        <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-linear-to-b from-blue-50/60 to-white p-6 text-center">
          <span className="px-2.5 py-1 rounded-full bg-blue-100/70 text-blue-700 text-xs font-semibold uppercase tracking-wider">
            Posture Score
          </span>

          <div className="mt-6 text-6xl font-extrabold tracking-tight text-blue-600">
            {stats.securityScore || 0}
            <span className="text-2xl text-slate-400 font-normal">/100</span>
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-800">
            Operational Posture
          </p>
          <p className="mt-1 text-xs text-slate-500 max-w-[200px]">
            Aggregated health across all monitored log sources
          </p>
        </div>

      </div>
    </Card>
  );
}