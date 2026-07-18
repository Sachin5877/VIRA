import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLogData } from "../services/viewerService";

export default function LogViewer() {
    const { filename } = useParams();
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [investigation, setInvestigation] = useState(false);

  useEffect(() => {
    loadLogs();
  }, []);

  async function loadLogs() {
    try {
      const data = await getLogData(filename);// We'll make this dynamic later
      setLogs(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-xl">
        Loading Logs...
      </div>
    );
  }
const filteredLogs = logs.filter((row) =>
  Object.values(row).some((value) =>
    String(value).toLowerCase().includes(search.toLowerCase())
  )
);
const totalLogs = filteredLogs.length;

const uniqueIPs = new Set(
  filteredLogs.map(log => log.source_ip)
).size;

const failedLogins = filteredLogs.filter(log =>
  String(log.event).toLowerCase().includes("failed")
).length;

const malwareEvents = filteredLogs.filter(log =>
  String(log.event).toLowerCase().includes("malware")
).length;
const getSeverity = (event) => {
  const e = String(event).toLowerCase();

  if (e.includes("malware")) return "High";
  if (e.includes("failed")) return "Medium";
  return "Low";
};
 return (
  <div className="min-h-screen bg-slate-950 text-white p-8">
    <div className="mb-8">
      <h1 className="text-4xl font-bold">Log Viewer</h1>

      <p className="mt-2 text-slate-400">
        Viewing: {filename}
      </p>

      <input
        type="text"
        placeholder="Search logs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mt-4 mb-6 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-cyan-500"
      />
    </div>

    <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">Total Logs</p>
        <h2 className="mt-2 text-3xl font-bold">{totalLogs}</h2>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">Unique IPs</p>
        <h2 className="mt-2 text-3xl font-bold">{uniqueIPs}</h2>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">Failed Logins</p>
        <h2 className="mt-2 text-3xl font-bold text-yellow-400">
          {failedLogins}
        </h2>
      </div>

      <div className="rounded-2xl border border-slate-700 bg-slate-900 p-6">
        <p className="text-slate-400">Malware Events</p>
        <h2 className="mt-2 text-3xl font-bold text-red-400">
          {malwareEvents}
        </h2>
      </div>
    </div>

    <div className="mb-8 flex justify-end">
      <button
        onClick={() => setInvestigation(true)}
        className="rounded-xl bg-cyan-600 px-6 py-3 font-semibold text-white transition hover:bg-cyan-500"
      >
        🔍 Investigate with VIRA
      </button>
    </div>

    {investigation && (
      <div className="mb-8 rounded-2xl border border-cyan-500/30 bg-slate-900 p-6">
        <h2 className="text-2xl font-bold text-cyan-400">
          VIRA Investigation
        </h2>

        <p className="mt-4 text-slate-300">
          AI investigation module will analyze this log file.
        </p>

        <div className="mt-6 rounded-xl bg-slate-950 p-4">
          <p className="text-slate-400">
            Waiting for AI analysis...
          </p>
        </div>
      </div>
    )}

    <div className="overflow-x-auto rounded-xl border border-slate-700">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            {logs.length > 0 &&
              Object.keys(logs[0]).map((key) => (
                <th
                  key={key}
                  className="border-b border-slate-700 px-4 py-3 text-left"
                >
                  {key}
                </th>
              ))}

            <th className="border-b border-slate-700 px-4 py-3 text-left">
              Severity
            </th>
          </tr>
        </thead>

        <tbody>
          {filteredLogs.map((row, index) => (
            <tr
              key={index}
              className="border-b border-slate-800 hover:bg-slate-900"
            >
              {Object.values(row).map((value, i) => (
                <td key={i} className="px-4 py-3">
                  {String(value)}
                </td>
              ))}

              <td className="px-4 py-3">
                <span
                  className={`rounded-full px-3 py-1 text-sm font-semibold ${
                    getSeverity(row.event) === "High"
                      ? "bg-red-500/20 text-red-400"
                      : getSeverity(row.event) === "Medium"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {getSeverity(row.event)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
}