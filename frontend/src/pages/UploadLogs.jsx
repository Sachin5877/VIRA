import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  UploadCloud,
  CheckCircle2,
  Shield,
  FileText,
  ArrowRight,
  Database,
  Lock,
  Cpu,
  Terminal,
  AlertCircle
} from "lucide-react";
import { uploadLog } from "../services/uploadService";
import { getFiles } from "../services/fileService";
import { useNotifications } from "../context/NotificationContext";
import { useDashboard } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom";

export default function UploadLogs() {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState([]);
  const { addNotification } = useNotifications();
  const { stats, setStats } = useDashboard();
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;
    setUploading(true);
    setMessage("");

    try {
      const file = acceptedFiles[0];
      const result = await uploadLog(file);

      setMessage(result.message || `${file.name} ingested successfully.`);
      setStats((prev) => ({
        ...prev,
        totalLogs: (prev.totalLogs || 0) + 1,
        uploadedFiles: (prev.uploadedFiles || 0) + 1,
      }));

      addNotification(
        "Ingestion Verified",
        `${file.name} parsed and indexed in SOC cluster.`,
        "border-green-500"
      );

      await loadFiles();
    } catch (err) {
      setMessage("Log file ingestion failed. Verify format schema.");
      console.error(err);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="space-y-6">
      {/* PAGE HEADER BANNER */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-900">
                Forensic Telemetry Ingestion Hub
              </h1>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
                PIPELINE READY
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Ingest raw system logs (CSV / JSON) for automated IOC correlation and MITRE ATT&CK technique extraction.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200 font-mono">
              {files.length} ARTIFACTS INGESTED
            </span>
          </div>
        </div>
      </div>

      {/* TWO-COLUMN INGESTION STUDIO */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: DROPZONE & SPECIFICATIONS (6 COLS) */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs">
            <div className="flex items-center gap-2 pb-4 border-b border-slate-100">
              <UploadCloud size={18} className="text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">
                Secure Telemetry Ingestion Node
              </h2>
            </div>

            <div
              {...getRootProps()}
              className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-all ${
                isDragActive
                  ? "border-blue-500 bg-blue-50/70"
                  : "border-slate-300 bg-slate-50/60 hover:border-blue-500 hover:bg-slate-50"
              }`}
            >
              <input {...getInputProps()} />

              <div className="mx-auto mb-3 h-14 w-14 rounded-2xl bg-blue-50 border border-blue-200/70 flex items-center justify-center text-blue-600 shadow-xs">
                <UploadCloud size={26} />
              </div>

              <p className="text-sm font-bold text-slate-900">
                {uploading ? "Ingesting and indexing artifact..." : "Drag & drop your log artifact here"}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                or <span className="text-blue-600 font-semibold underline underline-offset-2">browse files</span> from your workstation
              </p>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-400 font-mono">
                <Shield size={13} className="text-emerald-600" />
                <span>Format Schemas: CSV, JSON · TLS 1.3 Verified</span>
              </div>
            </div>

            {message && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2.5">
                <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                <span className="font-semibold">{message}</span>
              </div>
            )}
          </div>

          {/* INGESTION SCHEMA GUIDANCE */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Automated Pipeline Parsing Pipeline
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <p className="font-bold text-slate-800">CSV Formats</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  timestamp, source_ip, event, status, username, details
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/60">
                <p className="font-bold text-slate-800">JSON Formats</p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Suricata, Zeek, Syslog, Windows Event logs (EVTX-JSON)
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: ACTIVE ARTIFACTS REGISTRY (6 COLS) */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col h-full">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Database size={18} className="text-blue-600" />
                <h2 className="text-sm font-bold text-slate-900">
                  Forensic Artifact Repository
                </h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {files.length} Ready
              </span>
            </div>

            {files.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center py-16 text-center text-slate-400">
                <FileText size={36} className="text-slate-300 mb-2" />
                <p className="text-xs font-semibold text-slate-700">No forensic artifacts indexed</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Ingest a log file on the left to begin.</p>
              </div>
            ) : (
              <div className="mt-4 divide-y divide-slate-100 overflow-y-auto max-h-[500px] pr-1">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="py-3.5 flex items-center justify-between group hover:bg-slate-50 px-2 rounded-xl transition"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 group-hover:bg-blue-50 text-slate-600 group-hover:text-blue-600 flex items-center justify-center shrink-0 border border-slate-200/70 transition">
                        <FileText size={18} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-bold text-slate-900 truncate">
                          {file.filename}
                        </p>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          {file.size} KB • {file.uploaded_at || "Recent capture"}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => navigate(`/viewer/${file.filename}`)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-2xs transition cursor-pointer"
                    >
                      <span>Analyze</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}