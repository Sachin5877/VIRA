import Card from "../ui/Card";
import analytics from "../../data/analytics";

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
const severity = [
  { name: "Critical", value: 8 },
  { name: "High", value: 18 },
  { name: "Medium", value: 42 },
  { name: "Low", value: 31 },
];

const ips = [
  { ip: "192.168.1.5", count: 26 },
  { ip: "10.0.0.8", count: 18 },
  { ip: "172.16.0.2", count: 14 },
  { ip: "8.8.8.8", count: 9 },
];

const COLORS = [
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
];
export default function ThreatAnalytics() {
  return (
    <Card>
      <>
  <h2 className="text-2xl font-bold text-white">
    Threat Analytics
  </h2>

  <p className="mt-2 text-slate-400">
    Security trends and analytics
  </p>

  <div className="mt-8 grid gap-8 xl:grid-cols-3">

    {/* Line Chart */}

    <div className="h-80 rounded-xl bg-slate-900 p-4">
      <h3 className="mb-4 text-white font-semibold">
        Weekly Alerts
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={analytics}>
          <CartesianGrid stroke="#1E293B" />
          <XAxis dataKey="day" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="alerts"
            stroke="#06B6D4"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>

    {/* Pie Chart */}

    <div className="h-80 rounded-xl bg-slate-900 p-4">
      <h3 className="mb-4 text-white font-semibold">
        Severity Distribution
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={severity}
            dataKey="value"
            outerRadius={90}
          >
            {severity.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}
              />
            ))}
          </Pie>

          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>

    {/* Bar Chart */}

    <div className="h-80 rounded-xl bg-slate-900 p-4">
      <h3 className="mb-4 text-white font-semibold">
        Top Source IPs
      </h3>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={ips}>
          <CartesianGrid stroke="#1E293B" />
          <XAxis dataKey="ip" stroke="#94A3B8" />
          <YAxis stroke="#94A3B8" />
          <Tooltip />

          <Bar
            dataKey="count"
            fill="#3B82F6"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>

  </div>
</>
    </Card>
  );
}