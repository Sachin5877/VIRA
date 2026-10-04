import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  FileText,
  UploadCloud,
  Brain,
  ArrowRight,
  Filter,
  CheckCircle,
  Activity,
  Layers,
  Flame,
  Search,
  Zap,
  ExternalLink,
  Clock,
  Database
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";

import { useDashboard } from "../context/DashboardContext";
import { getDashboardData } from "../services/dashboardService";
import { getFiles } from "../services/fileService";
import { useDropzone } from "react-dropzone";
import { uploadLog } from "../services/uploadService";
import { useNotifications } from "../context/NotificationContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { stats, setStats } = useDashboard();
  const { addNotification } = useNotifications();

  const [files, setFiles] = useState([]);
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [uploading, setUploading] = useState(false);
  const [loadingDashboard, setLoadingDashboard] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await getDashboardData();
        setStats({
          totalLogs: data.total_logs || 0,
          uploadedFiles: data.uploaded_files || 0,
          investigations: data.active_investigations || 0,
          reports: data.reports_generated || 0,
          highAlerts: data.critical_alerts || 0,
          mitreTechniques: data.mitre_techniques || 0,
          securityScore: data.security_score || 85,
          recentAlerts: data.recent_alerts || [],
          eventDistribution: data.event_distribution || [],
          severityDistribution: data.severity_distribution || [],
          summary: data.summary || "",
        });
      } catch (err) {
        console.error("Dashboard API Error:", err);
      } finally {
        setLoadingDashboard(false);
      }

      try {
        const fileList = await getFiles();
        setFiles(fileList || []);
      } catch (err) {
        console.error("File loading error:", err);
      }
    }

    loadData();
  }, [setStats]);

  // Integrated quick dropzone directly on the tactical surface
  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setUploading(true);
    try {
      const file = acceptedFiles[0];
      const result = await uploadLog(file);
      addNotification("File Ingested", `${file.name} uploaded successfully.`, "border-green-500");
      setStats((prev) => ({
        ...prev,
        uploadedFiles: (prev.uploadedFiles || 0) + 1,
      }));
      const updatedFiles = await getFiles();
      setFiles(updatedFiles);
      navigate(`/viewer/${file.name}`);
    } catch (err) {
      console.error(err);
      addNotification("Upload Failed", "Could not ingest log file.", "border-rose-500");
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "text/csv": [".csv"], "application/json": [".json"] },
    multiple: false,
    onDrop,
  });

  // Severity alerts filter
  const alerts = stats.recentAlerts || [];
  const filteredAlerts = alerts.filter((alert) => {
    if (selectedSeverity === "all") return true;
    const sev = String(alert.severity || alert.level || "").toLowerCase();
    return sev === selectedSeverity.toLowerCase();
  });

  const chartColors = ["#2563eb", "#f59e0b", "#ef4444", "#10b981", "#8b5cf6"];

  return (
    <div className="space-y-6">
      {/* ========================================================================= */}
      {/* 1. EXECUTIVE CYBER DEFENSE POSTURE BANNER (NOT 4 standard cards)         */}
      {/* ========================================================================= */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* POSTURE GAUGE & OVERVIEW */}
          <div className="flex items-start sm:items-center gap-5">
            <div className="relative flex items-center justify-center shrink-0">
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-blue-500/20">
                <div className="h-full w-full bg-white rounded-[14px] flex flex-col items-center justify-center">
                  <span className="text-2xl font-black text-slate-900 leading-none">
                    {stats.securityScore || 85}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase mt-0.5">
                    INDEX
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1 border-2 border-white">
                <ShieldCheck size={12} strokeWidth={3} />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-black tracking-tight text-slate-900">
                  Tactical Incident Command Surface
                </h1>
                <span className="bg-blue-50 text-blue-700 font-mono text-[11px] font-bold px-2 py-0.5 rounded border border-blue-100">
                  REAL-TIME TELEMETRY
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1 max-w-xl">
                Continuous log ingestion, MITRE ATT&CK technique extraction, and autonomous AI-driven forensic threat triage.
              </p>
            </div>
          </div>

          {/* TELEMETRY MATRIX STRIP */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-6 pt-4 lg:pt-0">
            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Ingested Logs</p>
              <p className="text-lg font-black text-slate-900 font-mono mt-0.5">{stats.totalLogs || 0}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Raw events parsed</p>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">High Alerts</p>
              <p className={`text-lg font-black font-mono mt-0.5 ${stats.highAlerts > 0 ? "text-rose-600" : "text-slate-900"}`}>
                {stats.highAlerts || 0}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Critical anomalies</p>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">MITRE Techniques</p>
              <p className="text-lg font-black text-blue-600 font-mono mt-0.5">{stats.mitreTechniques || 0}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Adversary tactics</p>
            </div>

            <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-200/60">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Files</p>
              <p className="text-lg font-black text-slate-900 font-mono mt-0.5">{files.length || stats.uploadedFiles || 0}</p>
              <p className="text-[10px] text-slate-500 mt-0.5">Forensic artifacts</p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SPLIT INVESTIGATION WORKSPACE CANVAS                                   */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* LEFT COLUMN (7 COLS): RAPID INVESTIGATION TRIAGE DECK */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* FORENSIC ARTIFACT LAUNCHPAD (Files Ready for Investigation) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="h-7 w-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  <Database size={16} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">
                    Forensic Artifact Launchpad
                  </h2>
                  <p className="text-[11px] text-slate-500">
                    Select a forensic capture to launch immediate automated threat analysis
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate("/upload")}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 transition flex items-center gap-1 cursor-pointer"
              >
                <span>Upload New</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {files.length === 0 ? (
              <div className="py-8 text-center bg-slate-50/60 rounded-xl border border-dashed border-slate-200 mt-3 p-4">
                <FileText className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-xs font-semibold text-slate-700">No ingested log files available</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Upload a CSV or JSON log artifact to begin triage</p>
                <button
                  onClick={() => navigate("/upload")}
                  className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition cursor-pointer"
                >
                  <UploadCloud size={14} />
                  <span>Ingest First Log</span>
                </button>
              </div>
            ) : (
              <div className="mt-3 divide-y divide-slate-100 max-h-72 overflow-y-auto pr-1">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="py-3 flex items-center justify-between group hover:bg-slate-50 px-3 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-9 w-9 rounded-lg bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/60 transition">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {file.filename}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5 text-[10px] text-slate-400">
                          <span className="font-mono">{file.size} KB</span>
                          <span>•</span>
                          <span>{file.uploaded_at || "Recently ingested"}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate(`/viewer/${file.filename}`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 group-hover:bg-blue-600 text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
                      >
                        <span>Investigate</span>
                        <ArrowRight size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ACTIVE SECURITY TRIAGE STREAM */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldAlert size={18} className="text-rose-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Incident Triage Stream
                </h3>
                <span className="text-[10px] font-bold px-1.5 py-0.2 bg-rose-50 text-rose-700 rounded border border-rose-200">
                  {filteredAlerts.length} Events
                </span>
              </div>

              {/* SEVERITY FILTER CHIPS */}
              <div className="flex items-center gap-1 bg-slate-100 p-0.5 rounded-lg text-xs">
                {["all", "high", "medium", "low"].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(sev)}
                    className={`px-2.5 py-1 rounded-md text-[11px] font-semibold uppercase tracking-wider transition cursor-pointer ${
                      selectedSeverity === sev
                        ? "bg-white text-slate-900 shadow-2xs font-bold"
                        : "text-slate-500 hover:text-slate-800"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>

            {filteredAlerts.length === 0 ? (
              <div className="py-10 text-center text-xs text-slate-400">
                <CheckCircle className="mx-auto text-emerald-500 mb-2" size={28} />
                <p className="font-semibold text-slate-700">No active incidents matching criteria</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Threat posture within acceptable security parameters</p>
              </div>
            ) : (
              <div className="mt-3 space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {filteredAlerts.map((alert, index) => {
                  const sev = String(alert.severity || alert.level || "MEDIUM").toUpperCase();
                  const isHigh = sev.includes("HIGH") || sev.includes("CRITICAL");
                  const isMed = sev.includes("MED");

                  return (
                    <div
                      key={index}
                      className="p-3.5 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition shadow-2xs flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <span
                          className={`mt-0.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider shrink-0 ${
                            isHigh
                              ? "bg-rose-100 text-rose-700 border border-rose-200"
                              : isMed
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-blue-100 text-blue-700 border border-blue-200"
                          }`}
                        >
                          {sev}
                        </span>

                        <div className="min-w-0">
                          <p className="text-xs font-bold text-slate-900 truncate">
                            {alert.title || alert.event || alert.message || "Uncategorized Threat Anomaly"}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {alert.description || alert.details || "Detected anomalous event signature requiring SecOps review."}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5 text-[10px] font-mono text-slate-400">
                            {alert.ip && <span>IP: {alert.ip}</span>}
                            {alert.timestamp && <span>TIME: {alert.timestamp}</span>}
                          </div>
                        </div>
                      </div>

                      {alert.file && (
                        <button
                          onClick={() => navigate(`/viewer/${alert.file}`)}
                          className="shrink-0 p-1.5 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition cursor-pointer"
                          title="Jump to Investigation"
                        >
                          <ExternalLink size={15} />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT COLUMN (5 COLS): THREAT INTELLIGENCE & INGESTION DOCK */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* QUICK IN-LINE INGESTION DROPZONE (No need to navigate away!) */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <UploadCloud size={17} className="text-blue-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Instant Telemetry Ingestion
                </h3>
              </div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                CSV / JSON
              </span>
            </div>

            <div
              {...getRootProps()}
              className={`mt-3 cursor-pointer rounded-xl border-2 border-dashed p-6 text-center transition-all ${
                isDragActive
                  ? "border-blue-500 bg-blue-50"
                  : "border-slate-200 bg-slate-50/60 hover:border-blue-400 hover:bg-slate-50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="mx-auto mb-2 h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100">
                <UploadCloud size={20} />
              </div>
              <p className="text-xs font-bold text-slate-800">
                {uploading ? "Ingesting & Correlating..." : "Drop log artifact here"}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Immediate ingestion, parsing, and MITRE mapping
              </p>
            </div>
          </div>

          {/* ATTACK VECTOR & SEVERITY ANALYTICS */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Activity size={17} className="text-indigo-600" />
                <h3 className="text-sm font-bold text-slate-900">
                  Threat Vector Distribution
                </h3>
              </div>
              <span className="text-[10px] font-mono font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                AGGREGATE
              </span>
            </div>

            <div className="mt-4 h-48 w-full">
              {stats.eventDistribution && stats.eventDistribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.eventDistribution}>
                    <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        borderColor: "#e2e8f0",
                        borderRadius: "8px",
                        fontSize: "12px",
                      }}
                    />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-4 text-slate-400">
                  <Activity size={28} className="text-slate-300 mb-1" />
                  <p className="text-xs font-medium">Distribution telemetry awaiting logs</p>
                </div>
              )}
            </div>
          </div>

          {/* VIRA AI COPILOT TACTICAL BRIEFING */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center justify-between pb-3 border-b border-slate-700/80">
              <div className="flex items-center gap-2">
                <Brain size={18} className="text-cyan-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                  VIRA Cognitive Engine
                </h4>
              </div>
              <span className="text-[10px] font-mono bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded border border-cyan-500/30">
                SOC AGENT v1.0
              </span>
            </div>

            <p className="text-xs text-slate-300 mt-3 leading-relaxed">
              {stats.summary ||
                "VIRA is actively monitoring ingested telemetry. Run automated investigations on any log artifact to correlate indicators of compromise with MITRE ATT&CK techniques."}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-700/80 flex items-center justify-between">
              <span className="text-[11px] text-slate-400 font-mono">Query AI Copilot:</span>
              <button
                onClick={() => navigate("/chat")}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
              >
                <span>Open Terminal</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}