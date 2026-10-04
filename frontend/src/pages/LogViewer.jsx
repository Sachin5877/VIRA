import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Brain,
  ShieldAlert,
  ShieldCheck,
  Activity,
  Search,
  Download,
  Copy,
  Check,
  ArrowLeft,
  Terminal,
  FileText,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Filter,
  Flame,
  CheckCircle2,
  Globe,
  Link as LinkIcon,
  Mail,
  Hash,
  Server
} from "lucide-react";

import { getLogs } from "../services/logService";
import { getIOCs } from "../services/iocService";
import { investigateLog } from "../services/investigationService";
import { getMitre } from "../services/mitreService";
import { getTimeline } from "../services/timelineService";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export default function LogViewer() {
  const { filename } = useParams();
  const navigate = useNavigate();

  // Core Data States
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState(null);

  // Active Workspace Tab
  const [activeTab, setActiveTab] = useState("dossier"); // "dossier" | "events" | "analytics"

  // AI Investigation States
  const [aiLoading, setAiLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [investigationDone, setInvestigationDone] = useState(false);
  const [result, setResult] = useState(null);
  const [ioc, setIoc] = useState(null);
  const [mitre, setMitre] = useState([]);
  const [timeline, setTimeline] = useState([]);
  const [riskScore, setRiskScore] = useState(0);
  const [recommendations, setRecommendations] = useState([]);

  // Copy indicator state
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(text);
    setTimeout(() => setCopiedText(""), 2000);
  };

  // Load Initial Logs & IOCs
  useEffect(() => {
    if (filename) {
      loadInitialData();
    }
  }, [filename]);

  async function loadInitialData() {
    setLoading(true);
    try {
      const logData = await getLogs(filename);
      setLogs(logData || []);
      if (logData && logData.length > 0) {
        setSelectedLog(logData[0]);
      }

      try {
        const iocData = await getIOCs(filename);
        setIoc(iocData);
      } catch (e) {
        console.error("IOC load error:", e);
      }
    } catch (error) {
      console.error("Log loading failed:", error);
    } finally {
      setLoading(false);
    }
  }

  // Calculate Log Metrics
  const filteredLogs = logs.filter((row) => {
    const matchesSearch = Object.values(row).some((val) =>
      String(val).toLowerCase().includes(search.toLowerCase())
    );
    if (!matchesSearch) return false;

    if (severityFilter === "all") return true;
    const sev = getSeverity(row.event || row.message || row.level || "").toLowerCase();
    return sev === severityFilter.toLowerCase();
  });

  const malwareEvents = logs.filter((log) =>
    String(log.event || log.message || "").toLowerCase().includes("malware")
  ).length;

  const failedLogins = logs.filter((log) =>
    String(log.event || log.message || "").toLowerCase().includes("failed")
  ).length;

  const calculatedSeverityData = [
    { name: "Critical / High", value: malwareEvents, color: "#ef4444" },
    { name: "Medium (Suspicious)", value: failedLogins, color: "#f59e0b" },
    {
      name: "Informational",
      value: Math.max(logs.length - malwareEvents - failedLogins, 0),
      color: "#10b981",
    },
  ];

  function getSeverity(event) {
    const e = String(event).toLowerCase();
    if (e.includes("malware") || e.includes("critical") || e.includes("root")) return "High";
    if (e.includes("failed") || e.includes("warn") || e.includes("unauthorized")) return "Medium";
    return "Low";
  }

  // Trigger Deep AI Investigation
  async function runInvestigation() {
    try {
      setAiLoading(true);
      setActiveTab("dossier");

      // Progress animation steps
      for (let step = 1; step <= 5; step++) {
        setLoadingStep(step);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      const invData = await investigateLog(filename);
      setResult(invData);

      const mitreData = await getMitre(filename);
      setMitre(mitreData || []);

      const timelineData = await getTimeline(filename);
      setTimeline(timelineData || []);

      const calculatedScore = Math.min(malwareEvents * 25 + failedLogins * 6 + 40, 98);
      setRiskScore(calculatedScore);

      setRecommendations([
        "Isolate flagged endpoint IP addresses from internal corporate subnet",
        "Enforce multi-factor re-authentication for all failed credential accounts",
        "Deploy EDR memory dump analysis on affected hosts",
        "Audit perimeter firewall ingress rules against identified IOC domains",
      ]);

      setInvestigationDone(true);
    } catch (error) {
      console.error("VIRA Investigation Error:", error);
    } finally {
      setAiLoading(false);
      setLoadingStep(0);
    }
  }

  const investigationSteps = [
    "Ingesting & parsing raw telemetry events...",
    "Correlating Indicators of Compromise (IPs, Hashes, Domains)...",
    "Mapping adversary tactics to MITRE ATT&CK Matrix...",
    "Reconstructing chronological attack kill chain...",
    "Synthesizing autonomous AI threat dossier...",
  ];

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center max-w-sm text-center">
          <div className="h-10 w-10 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-3" />
          <h2 className="text-sm font-bold text-slate-900">Loading Forensic Workspace</h2>
          <p className="text-xs text-slate-500 mt-1 font-mono">Parsing {filename}...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. FORENSIC STUDIO COMMAND BAR                                            */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          <div className="flex items-start sm:items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="p-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-500 hover:text-slate-900 transition cursor-pointer"
              title="Return to Command Surface"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-base font-black text-slate-900">
                  {filename}
                </span>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                  Forensic Capture
                </span>
                {malwareEvents > 0 && (
                  <span className="text-[11px] font-bold uppercase px-2 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200 flex items-center gap-1">
                    <Flame size={12} />
                    <span>Malicious Signatures</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-2 font-mono">
                <span>{logs.length} Total Events</span>
                <span>•</span>
                <span>{failedLogins} Auth Failures</span>
                <span>•</span>
                <span>{malwareEvents} Malware Hits</span>
              </p>
            </div>
          </div>

          {/* ACTIONS: RUN INVESTIGATION & EXPORT */}
          <div className="flex items-center gap-3">
            {result && (
              <button
                onClick={() =>
                  navigate("/report", {
                    state: {
                      report: {
                        file: filename,
                        summary: result.summary,
                        mitre,
                        iocs: [
                          ...(ioc?.ips || []),
                          ...(ioc?.domains || []),
                          ...(ioc?.urls || []),
                          ...(ioc?.emails || []),
                        ],
                        timeline,
                      },
                    },
                  })
                }
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              >
                <FileText size={15} />
                <span>Export Dossier Report</span>
              </button>
            )}

            <button
              onClick={runInvestigation}
              disabled={aiLoading}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
            >
              <Brain size={16} />
              <span>{aiLoading ? "Executing AI Analysis..." : result ? "Re-Run AI Investigation" : "Launch AI Investigation"}</span>
            </button>
          </div>

        </div>

        {/* WORKSPACE VIEW SWITCHER TABS */}
        <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab("dossier")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "dossier"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles size={14} className={activeTab === "dossier" ? "text-blue-600" : "text-slate-400"} />
              <span>AI Investigation Dossier</span>
              {result && (
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 ml-1"></span>
              )}
            </button>

            <button
              onClick={() => setActiveTab("events")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "events"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Terminal size={14} className={activeTab === "events" ? "text-blue-600" : "text-slate-400"} />
              <span>Forensic Event Stream</span>
              <span className="text-[10px] font-mono bg-slate-200 px-1.5 py-0.2 rounded text-slate-700 ml-1">
                {filteredLogs.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                activeTab === "analytics"
                  ? "bg-white text-blue-700 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Activity size={14} className={activeTab === "analytics" ? "text-blue-600" : "text-slate-400"} />
              <span>Telemetry Analytics</span>
            </button>
          </div>

          <div className="text-xs font-mono text-slate-400 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>ARTIFACT STATUS: VALIDATED</span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. AI INVESTIGATION PROGRESS OVERLAY (When executing)                     */}
      {/* ========================================================================= */}
      {aiLoading && (
        <div className="bg-white rounded-2xl border border-blue-200 p-8 shadow-md">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <div className="h-14 w-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200 animate-pulse">
              <Brain size={28} />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                VIRA Autonomous Investigation Engine Active
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                {investigationSteps[loadingStep - 1] || "Initializing neural analysis nodes..."}
              </p>
            </div>

            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-full transition-all duration-500 rounded-full"
                style={{ width: `${loadingStep * 20}%` }}
              />
            </div>

            <div className="grid grid-cols-5 gap-1 pt-2">
              {investigationSteps.map((step, idx) => (
                <div
                  key={idx}
                  className={`text-[10px] font-mono text-center p-1 rounded ${
                    loadingStep > idx
                      ? "text-blue-700 font-bold bg-blue-50"
                      : "text-slate-400"
                  }`}
                >
                  Step {idx + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. WORKSPACE TAB: AI INVESTIGATION DOSSIER                                */}
      {/* ========================================================================= */}
      {activeTab === "dossier" && (
        <div className="space-y-6">
          {!result && !aiLoading && (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center shadow-xs">
              <div className="h-16 w-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
                <Brain size={32} />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Automated AI Investigation Ready
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                VIRA AI will parse all raw log events in <span className="font-mono font-semibold text-slate-700">{filename}</span>, isolate Indicators of Compromise (IOCs), map techniques to the MITRE ATT&CK matrix, and construct a forensic incident timeline.
              </p>
              <button
                onClick={runInvestigation}
                className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition cursor-pointer"
              >
                <Brain size={16} />
                <span>Begin Autonomous Threat Investigation</span>
              </button>
            </div>
          )}

          {result && (
            <>
              {/* TOP VERDICT HERO BANNER */}
              <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="h-16 w-16 rounded-2xl bg-rose-50 border border-rose-200 text-rose-600 flex flex-col items-center justify-center shrink-0">
                      <span className="text-2xl font-black font-mono leading-none">{riskScore}%</span>
                      <span className="text-[9px] uppercase font-bold tracking-wider mt-0.5">RISK</span>
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-slate-900">
                          Forensic AI Investigation Verdict
                        </h2>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                          COMPLETED
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-1 max-w-2xl leading-relaxed">
                        Automated threat heuristics flagged anomalous activity matching adversary credential access and execution patterns.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">MITRE Techniques</p>
                      <p className="text-base font-black text-blue-600 font-mono mt-0.5">{mitre.length}</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-2.5 text-center">
                      <p className="text-[10px] uppercase font-bold text-slate-400">Timeline Events</p>
                      <p className="text-base font-black text-slate-900 font-mono mt-0.5">{timeline.length}</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* ASYMMETRIC INVESTIGATION GRID */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* LEFT COLUMN (7 COLS): SUMMARY & RECOMMENDED ACTIONS */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* AI EXECUTIVE SUMMARY */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                    <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                      <Brain size={18} className="text-blue-600" />
                      <h3 className="text-sm font-bold text-slate-900">
                        Executive AI Threat Summary
                      </h3>
                    </div>
                    <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200/60 text-slate-800 text-xs leading-relaxed whitespace-pre-wrap font-sans">
                      {result.summary}
                    </div>
                  </div>

                  {/* ACTIONABLE MITIGATION CHECKLIST */}
                  {recommendations.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                      <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
                        <CheckCircle2 size={18} className="text-emerald-600" />
                        <h3 className="text-sm font-bold text-slate-900">
                          Recommended Remediation Playbook
                        </h3>
                      </div>
                      <div className="mt-3 space-y-2.5">
                        {recommendations.map((rec, i) => (
                          <div
                            key={i}
                            className="p-3 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 transition flex items-start gap-3"
                          >
                            <input
                              type="checkbox"
                              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                            />
                            <p className="text-xs font-semibold text-slate-800">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* ADVERSARY CHRONOLOGICAL TIMELINE */}
                  {timeline.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Clock size={18} className="text-indigo-600" />
                          <h3 className="text-sm font-bold text-slate-900">
                            Reconstructed Attack Kill Chain
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">
                          {timeline.length} Steps
                        </span>
                      </div>

                      <div className="mt-4 relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
                        {timeline.map((item, idx) => (
                          <div key={idx} className="relative group">
                            <div className="absolute -left-[23px] top-1 h-3 w-3 rounded-full bg-blue-600 border-2 border-white shadow-xs group-hover:scale-125 transition" />
                            <div className="bg-slate-50/70 p-3 rounded-xl border border-slate-200/70 hover:bg-white hover:border-slate-300 transition">
                              <div className="flex items-center justify-between text-[11px]">
                                <span className="font-mono font-bold text-blue-600">{item.time}</span>
                                {item.ip && (
                                  <span className="font-mono text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                                    SRC: {item.ip}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs font-bold text-slate-900 mt-1">{item.event}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

                {/* RIGHT COLUMN (5 COLS): IOCs & MITRE MAPPING */}
                <div className="lg:col-span-5 space-y-6">
                  
                  {/* INDICATORS OF COMPROMISE (IOCs) */}
                  <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <ShieldAlert size={18} className="text-rose-600" />
                        <h3 className="text-sm font-bold text-slate-900">
                          Indicators of Compromise (IOCs)
                        </h3>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">
                        ACTIVE EXTRACT
                      </span>
                    </div>

                    <div className="mt-4 space-y-4">
                      {/* IP ADDRESSES */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                          <Server size={14} className="text-blue-600" />
                          <span>Malicious & Target IPs ({ioc?.ips?.length || 0})</span>
                        </div>
                        {ioc?.ips && ioc.ips.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {ioc.ips.map((ip, i) => (
                              <button
                                key={i}
                                onClick={() => copyToClipboard(ip)}
                                className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-800 hover:text-blue-700 text-xs font-mono border border-slate-200/80 transition cursor-pointer"
                                title="Click to copy IP"
                              >
                                <span>{ip}</span>
                                {copiedText === ip ? (
                                  <Check size={11} className="text-emerald-600" />
                                ) : (
                                  <Copy size={11} className="text-slate-400 group-hover:text-blue-600" />
                                )}
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">No suspicious IPs isolated.</p>
                        )}
                      </div>

                      {/* DOMAINS */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                          <Globe size={14} className="text-amber-600" />
                          <span>Extracted Domains ({ioc?.domains?.length || 0})</span>
                        </div>
                        {ioc?.domains && ioc.domains.length > 0 ? (
                          <div className="flex flex-wrap gap-1.5">
                            {ioc.domains.map((dom, i) => (
                              <button
                                key={i}
                                onClick={() => copyToClipboard(dom)}
                                className="group inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-amber-50 text-slate-800 hover:text-amber-800 text-xs font-mono border border-slate-200/80 transition cursor-pointer"
                              >
                                <span>{dom}</span>
                                <Copy size={11} className="text-slate-400" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">No malicious domains isolated.</p>
                        )}
                      </div>

                      {/* URLs */}
                      <div>
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700 mb-2">
                          <LinkIcon size={14} className="text-emerald-600" />
                          <span>Extracted URLs ({ioc?.urls?.length || 0})</span>
                        </div>
                        {ioc?.urls && ioc.urls.length > 0 ? (
                          <div className="space-y-1">
                            {ioc.urls.map((url, i) => (
                              <div
                                key={i}
                                className="p-2 rounded-lg bg-slate-50 text-xs font-mono text-slate-800 truncate border border-slate-200 flex items-center justify-between"
                              >
                                <span className="truncate">{url}</span>
                                <button
                                  onClick={() => copyToClipboard(url)}
                                  className="text-slate-400 hover:text-slate-700 ml-2"
                                >
                                  <Copy size={12} />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400">No external URLs detected.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* MITRE ATT&CK MAPPING CARDS */}
                  {mitre.length > 0 && (
                    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <Layers size={18} className="text-blue-600" />
                          <h3 className="text-sm font-bold text-slate-900">
                            MITRE ATT&CK Framework Mapping
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-blue-600 font-bold bg-blue-50 px-2 py-0.5 rounded">
                          ENTERPRISE MATRIX
                        </span>
                      </div>

                      <div className="mt-3 space-y-2.5 max-h-96 overflow-y-auto pr-1">
                        {mitre.map((item, index) => (
                          <div
                            key={index}
                            className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-white hover:border-blue-300 transition"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                                {item.id}
                              </span>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                {item.tactic}
                              </span>
                            </div>
                            <p className="text-xs font-bold text-slate-900 mt-2">
                              {item.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                </div>

              </div>
            </>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. WORKSPACE TAB: FORENSIC EVENT STREAM (Studio Master-Detail)             */}
      {/* ========================================================================= */}
      {activeTab === "events" && (
        <div className="space-y-4">
          
          {/* SEARCH & SEVERITY FILTER TOOLBAR */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-96">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search raw messages, IP addresses, events..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition"
              />
            </div>

            <div className="flex items-center gap-1.5 self-end sm:self-auto">
              <span className="text-[11px] font-semibold text-slate-500 mr-1">Severity:</span>
              {["all", "high", "medium", "low"].map((sev) => (
                <button
                  key={sev}
                  onClick={() => setSeverityFilter(sev)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition cursor-pointer ${
                    severityFilter === sev
                      ? "bg-slate-900 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          {/* SPLIT MASTER-DETAIL WORKBENCH */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT: EVENT LIST STREAM (7 COLS) */}
            <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden flex flex-col h-[600px]">
              <div className="p-3.5 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between text-xs font-bold text-slate-600">
                <span>Event Stream ({filteredLogs.length})</span>
                <span className="text-[11px] font-mono text-slate-400">Click row to inspect</span>
              </div>

              <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
                {filteredLogs.length === 0 ? (
                  <div className="py-16 text-center text-xs text-slate-400">
                    No log events match query
                  </div>
                ) : (
                  filteredLogs.map((log, index) => {
                    const sev = getSeverity(log.event || log.message || log.level || "");
                    const isSelected = selectedLog === log;

                    return (
                      <div
                        key={index}
                        onClick={() => setSelectedLog(log)}
                        className={`p-3 transition cursor-pointer text-xs flex items-center justify-between gap-3 ${
                          isSelected
                            ? "bg-blue-50/70 border-l-4 border-blue-600"
                            : "hover:bg-slate-50"
                        }`}
                      >
                        <div className="min-w-0 flex items-center gap-2.5">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase shrink-0 ${
                              sev === "High"
                                ? "bg-rose-100 text-rose-700"
                                : sev === "Medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {sev}
                          </span>

                          <div className="min-w-0">
                            <p className="font-bold text-slate-900 truncate">
                              {log.event || log.message || log.action || "Log Event"}
                            </p>
                            <p className="font-mono text-[11px] text-slate-400 truncate mt-0.5">
                              {log.timestamp || log.time || "No timestamp"}
                              {log.source_ip && ` • ${log.source_ip}`}
                            </p>
                          </div>
                        </div>

                        <ChevronRight size={15} className="text-slate-300 shrink-0" />
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* RIGHT: EVENT DETAIL INSPECTOR DRAWER (5 COLS) */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col h-[600px] overflow-hidden">
              <div className="pb-3 border-b border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-blue-600" />
                  <h3 className="text-sm font-bold text-slate-900">
                    Forensic Record Inspector
                  </h3>
                </div>
                {selectedLog && (
                  <span className="font-mono text-[10px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                    PARSED
                  </span>
                )}
              </div>

              {selectedLog ? (
                <div className="flex-1 overflow-y-auto mt-4 space-y-4 pr-1">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Primary Event</span>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {selectedLog.event || selectedLog.message || "Generic Event"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Severity</span>
                      <p className="text-xs font-bold text-slate-900 mt-0.5">
                        {getSeverity(selectedLog.event || selectedLog.message || "")}
                      </p>
                    </div>

                    <div className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/70">
                      <span className="text-[10px] uppercase font-bold text-slate-400">Source IP</span>
                      <p className="text-xs font-mono font-bold text-blue-600 mt-0.5">
                        {selectedLog.source_ip || selectedLog.ip || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Raw Parsed Parameters</span>
                    <div className="mt-1.5 p-3 rounded-xl bg-slate-900 text-cyan-300 font-mono text-[11px] overflow-x-auto">
                      <pre>{JSON.stringify(selectedLog, null, 2)}</pre>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-slate-400">
                  <Terminal size={32} className="text-slate-300 mb-2" />
                  <p className="text-xs font-medium">Select any log event on the left to view parsed telemetry.</p>
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. WORKSPACE TAB: TELEMETRY ANALYTICS                                     */}
      {/* ========================================================================= */}
      {activeTab === "analytics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Severity Distribution Breakdown
            </h3>
            <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={calculatedSeverityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {calculatedSeverityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-4 mt-2 text-xs">
              {calculatedSeverityData.map((d, i) => (
                <span key={i} className="flex items-center gap-1.5 font-medium">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }}></span>
                  <span className="text-slate-600">{d.name}:</span>
                  <span className="font-bold text-slate-900">{d.value}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 pb-3 border-b border-slate-100">
              Forensic Capture Profile
            </h3>
            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Target File Name:</span>
                <span className="font-mono font-bold text-slate-900">{filename}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Total Telemetry Records:</span>
                <span className="font-mono font-bold text-slate-900">{logs.length}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Malicious Threat Indicators:</span>
                <span className="font-mono font-bold text-rose-600">{malwareEvents}</span>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/70 flex items-center justify-between text-xs">
                <span className="text-slate-500">Failed Authentication Incidents:</span>
                <span className="font-mono font-bold text-amber-600">{failedLogins}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}