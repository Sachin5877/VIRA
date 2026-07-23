import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";

const COLORS = ["#ef4444", "#facc15", "#22c55e"];

export default function ThreatCharts({
  severityData,
  eventData,
}) {
  return (
    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

      {/* Severity Chart */}

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          Severity Distribution
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={severityData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
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

      {/* Event Chart */}

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <h2 className="mb-6 text-2xl font-bold text-cyan-400">
          Event Types
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={eventData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Legend />

            <Bar dataKey="count" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}