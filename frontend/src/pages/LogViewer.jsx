import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLogData } from "../services/viewerService";
import { investigateLog } from "../services/investigationService";
import { getIOCs } from "../services/iocService";
import { getMitre } from "../services/mitreService";
import { getTimeline } from "../services/timelineService";
import ThreatCharts from "../components/dashboard/ThreatCharts";


export default function LogViewer() {
  const { filename } = useParams();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [investigation, setInvestigation] = useState(false);
  const [result, setResult] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [ioc, setIoc] = useState(null);
  const [mitre, setMitre] = useState([]);
  const [timeline, setTimeline] = useState([]);
  

  useEffect(() => {
    if (filename) {
      loadLogs();
    }
  }, [filename]);

  async function loadLogs() {
  try {
    const data = await getLogData(filename);
    setLogs(data);

    const iocData = await getIOCs(filename);
    setIoc(iocData);

  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
}

 async function runInvestigation() {
  try {
    setAiLoading(true);

    const data = await investigateLog(filename);

    setResult(data);
    const mapping = await getMitre(filename);
setMitre(mapping);
const timelineData = await getTimeline(filename);
setTimeline(timelineData);
    setInvestigation(true);
  } catch (error) {
    console.error(error);
  } finally {
    setAiLoading(false);
  }
}

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-xl text-white">
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
    filteredLogs.map((log) => log.source_ip)
  ).size;

  const failedLogins = filteredLogs.filter((log) =>
    String(log.event).toLowerCase().includes("failed")
  ).length;

  const malwareEvents = filteredLogs.filter((log) =>
    String(log.event).toLowerCase().includes("malware")
  ).length;

  const getSeverity = (event) => {
    const severityData = [
  { name: "High", value: malwareEvents },
  { name: "Medium", value: failedLogins },
  {
    name: "Low",
    value:
      totalLogs -
      malwareEvents -
      failedLogins,
  },
];

const eventCounts = {};

filteredLogs.forEach((log) => {
  const event = log.event || "Unknown";

  eventCounts[event] = (eventCounts[event] || 0) + 1;
});

const eventData = Object.entries(eventCounts).map(
  ([name, count]) => ({
    name,
    count,
  })
);
    const e = String(event).toLowerCase();

    if (e.includes("malware")) return "High";
    if (e.includes("failed")) return "Medium";
    return "Low";
  };
  const severityData = [
  {
    name: "High",
    value: malwareEvents,
  },
  {
    name: "Medium",
    value: failedLogins,
  },
  {
    name: "Low",
    value:
      Math.max(
        totalLogs - malwareEvents - failedLogins,
        0
      ),
  },
];

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Log Viewer
        </h1>

        <p className="mt-2 text-slate-400">
          Viewing: {filename}
        </p>

        <input
          type="text"
          placeholder="Search logs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mt-4 w-full rounded-xl border border-slate-700 bg-slate-900 p-3 text-white outline-none focus:border-cyan-500"
        />
      </div>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
        {ioc && (
  <div className="mb-8 rounded-2xl border border-slate-700 bg-slate-900 p-6">
    <h2 className="mb-6 text-2xl font-bold text-cyan-400">
      Indicators of Compromise (IOC)
    </h2>

    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

      <div>
        <h3 className="mb-2 font-semibold text-red-400">
          🌐 IP Addresses
        </h3>

        {ioc.ips.length ? (
          <ul className="list-disc pl-6">
            {ioc.ips.map((ip, index) => (
              <li key={index}>{ip}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">None</p>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-yellow-400">
          🌍 Domains
        </h3>

        {ioc.domains.length ? (
          <ul className="list-disc pl-6">
            {ioc.domains.map((domain, index) => (
              <li key={index}>{domain}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">None</p>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-green-400">
          🔗 URLs
        </h3>

        {ioc.urls.length ? (
          <ul className="list-disc pl-6">
            {ioc.urls.map((url, index) => (
              <li key={index}>{url}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">None</p>
        )}
      </div>

      <div>
        <h3 className="mb-2 font-semibold text-blue-400">
          📧 Emails
        </h3>

        {ioc.emails.length ? (
          <ul className="list-disc pl-6">
            {ioc.emails.map((email, index) => (
              <li key={index}>{email}</li>
            ))}
          </ul>
        ) : (
          <p className="text-slate-400">None</p>
        )}
      </div>

    </div>
  </div>
)}
        
        <div className="mb-8 flex items-center justify-center">
  <button
    onClick={runInvestigation}
    disabled={aiLoading}
    className={`rounded-xl px-8 py-4 font-semibold text-white transition ${
      aiLoading
        ? "cursor-not-allowed bg-slate-600"
        : "bg-cyan-600 hover:bg-cyan-500"
    }`}
  >
    {aiLoading ? "🧠 VIRA is analyzing..." : "🔍 Investigate with VIRA"}
  </button>
</div>
      </div>

      {investigation && (
        <div className="mb-8 rounded-2xl border border-cyan-500/30 bg-slate-900 p-6">
          <h2 className="text-2xl font-bold text-cyan-400">
            VIRA Investigation
          </h2>

          <div className="mt-6 rounded-xl bg-slate-950 p-4">
            {aiLoading ? (
  <div className="rounded-xl bg-slate-950 p-6 text-center">
    <div className="text-3xl">🧠</div>

    <h3 className="mt-4 text-xl font-semibold text-cyan-400">
      VIRA is analyzing your logs...
    </h3>

    <p className="mt-2 text-slate-400">
      Please wait while Llama 3.1 investigates the uploaded log file.
    </p>
  </div>
) : result ? (
  <div>
    <h3 className="mb-4 text-xl font-semibold text-cyan-400">
      AI Investigation Report
    </h3>

    <pre className="whitespace-pre-wrap text-slate-300">
      {result.summary}
    </pre>

    {mitre.length > 0 && (
      <div className="mt-8">
        <h3 className="mb-4 text-2xl font-bold text-cyan-400">
          MITRE ATT&CK Mapping
        </h3>

        <div className="grid gap-4 md:grid-cols-2">
          {mitre.map((item, index) => (
            <div
              key={index}
              className="rounded-xl border border-slate-700 bg-slate-900 p-5"
            >
              <p className="text-lg font-bold text-cyan-400">
                {item.id}
              </p>

              <p className="mt-2 font-semibold">
                {item.name}
              </p>

              <p className="mt-1 text-slate-400">
                {item.tactic}
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
    {timeline.length > 0 && (
  <div className="mt-8">
    <h3 className="mb-4 text-2xl font-bold text-cyan-400">
      Investigation Timeline
    </h3>

    <div className="space-y-4">
      {timeline.map((item, index) => (
        <div
          key={index}
          className="rounded-xl border border-slate-700 bg-slate-900 p-5"
        >
          <p className="text-cyan-400 font-semibold">
            {item.time}
          </p>

          <p className="mt-2 text-lg">
            {item.event}
          </p>

          <p className="mt-1 text-slate-400">
            Source IP: {item.ip}
          </p>
        </div>
      ))}
    </div>
  </div>
)}
    

  </div>
) : (
  <p className="text-slate-400">
    Waiting for AI analysis...
  </p>
)}

          </div>
        </div>
      )}
<ThreatCharts severityData={severityData} />
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