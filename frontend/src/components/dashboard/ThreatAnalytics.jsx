import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";

import {
  LineChart,
  Line,
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
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#3b82f6",
];

export default function ThreatAnalytics() {

  const { stats } = useDashboard();

  // Event Distribution → Bar Chart
  const eventData = Object.entries(
    stats.eventDistribution || {}
  ).map(([event, count]) => ({
    event,
    count,
  }));

  // Severity Distribution → Pie Chart
  const severityData = Object.entries(
    stats.severityDistribution || {}
  ).map(([name, value]) => ({
    name,
    value,
  }));

  return (
    <Card>

      <h2 className="text-2xl font-bold text-white">
        Threat Analytics
      </h2>

      <p className="mt-2 text-slate-400">
        Security trends and analytics
      </p>

      <div className="mt-8 grid gap-8 xl:grid-cols-3">

        {/* Event Distribution */}

        <div className="h-80 rounded-xl bg-slate-900 p-4">

          <h3 className="mb-4 font-semibold text-white">
            Event Distribution
          </h3>

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={eventData}>

              <CartesianGrid stroke="#1E293B" />

              <XAxis
                dataKey="event"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#06B6D4"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Severity Distribution */}

        <div className="h-80 rounded-xl bg-slate-900 p-4">

          <h3 className="mb-4 font-semibold text-white">
            Severity Distribution
          </h3>

          <ResponsiveContainer width="100%" height="100%">

            <PieChart>

              <Pie
                data={severityData}
                dataKey="value"
                nameKey="name"
                outerRadius={90}
              >

                {severityData.map((entry, index) => (

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Security Score */}

        <div className="flex h-80 flex-col items-center justify-center rounded-xl bg-slate-900">

          <h3 className="text-xl font-semibold text-white">
            Security Score
          </h3>

          <div className="mt-8 text-7xl font-bold text-cyan-400">
            {stats.securityScore}
          </div>

          <p className="mt-4 text-slate-400">
            Current Security Rating
          </p>

        </div>

      </div>

    </Card>
  );
}