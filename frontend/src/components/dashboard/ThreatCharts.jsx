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

const COLORS = [
  "#14B8A6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
];

export default function ThreatCharts({
  severityData,
  eventData,
}) {

  return (

    <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">

      {/* Severity */}

      <div className="rounded-2xl border border-[#334155] bg-[#1B263B] p-6">

        <h2 className="mb-6 text-2xl font-bold text-[#14B8A6]">

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

      {/* Events */}

      <div className="rounded-2xl border border-[#334155] bg-[#1B263B] p-6">

        <h2 className="mb-6 text-2xl font-bold text-[#14B8A6]">

          Event Types

        </h2>

        <ResponsiveContainer width="100%" height={300}>

          <BarChart data={eventData}>

            <CartesianGrid stroke="#334155"/>

            <XAxis
              dataKey="name"
              stroke="#94A3B8"
            />

            <YAxis
              stroke="#94A3B8"
            />

            <Tooltip/>

            <Legend/>

            <Bar
              dataKey="count"
              fill="#14B8A6"
              radius={[6,6,0,0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}