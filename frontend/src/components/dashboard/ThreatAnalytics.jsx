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
  "#14B8A6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#6366F1",
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

      <h2 className="text-2xl font-bold text-[#F8FAFC]">
        Threat Analytics
      </h2>

      <p className="mt-2 text-[#94A3B8]">
        Security trends and analytics
      </p>

      <div className="mt-8 grid gap-8 xl:grid-cols-3">

        {/* Event Distribution */}

        <div className="h-80 rounded-xl bg-[#111827] border border-[#334155] p-4">

          <h3 className="mb-4 font-semibold text-[#F8FAFC]">
            Event Distribution
          </h3>

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={eventData}>

              <CartesianGrid stroke="#334155" />

              <XAxis
                dataKey="event"
                stroke="#94A3B8"
              />

              <YAxis stroke="#94A3B8" />

              <Tooltip />

              <Bar
                dataKey="count"
                fill="#14B8A6"
                radius={[6,6,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        {/* Severity */}

        <div className="h-80 rounded-xl bg-[#111827] border border-[#334155] p-4">

          <h3 className="mb-4 font-semibold text-[#F8FAFC]">
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

                {severityData.map((entry,index)=>(

                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />

                ))}

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>

        {/* Score */}

        <div className="flex h-80 flex-col items-center justify-center rounded-xl border border-[#334155] bg-[#111827]">

          <h3 className="text-xl font-semibold text-[#F8FAFC]">
            Security Score
          </h3>

          <div className="mt-8 text-7xl font-bold text-[#14B8A6]">
            {stats.securityScore}
          </div>

          <p className="mt-4 text-[#94A3B8]">
            Current Security Rating
          </p>

        </div>

      </div>

    </Card>

  );

}