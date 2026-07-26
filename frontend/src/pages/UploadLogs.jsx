import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { uploadLog } from "../services/uploadService";
import UploadedLogs from "../components/upload/UploadedLogs";
import { useNotifications } from "../context/NotificationContext";
import { useDashboard } from "../context/DashboardContext";
import { useNavigate } from "react-router-dom";

export default function UploadLogs() {
  const [message, setMessage] = useState("");
  const { addNotification } = useNotifications();
  const { stats, setStats } = useDashboard();
  const navigate = useNavigate();

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    try {
      const result = await uploadLog(acceptedFiles[0]);

      setMessage(result.message);
      setStats({
  ...stats,
  totalLogs: stats.totalLogs + 1,
  uploadedFiles: stats.uploadedFiles + 1,
});

      // 🔔 Add Notification
      console.log("Notification Triggered");

addNotification(
  "Upload Successful",
  `${acceptedFiles[0].name} uploaded successfully.`,
  "border-green-500"
);
    } catch (err) {
      setMessage("Upload failed.");
      console.error(err);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
    },
    multiple: false,
    onDrop,
  });

  return (
    <div className="min-h-screen bg-slate-950 p-8 text-white">
      <h1 className="text-4xl font-bold">
        Upload Security Logs
      </h1>

      <p className="mt-2 text-slate-400">
        Upload CSV or JSON log files for investigation.
      </p>

      <div
        {...getRootProps()}
        className="mt-10 cursor-pointer rounded-2xl border-2 border-dashed border-slate-700 p-16 text-center transition hover:border-blue-500"
      >
        <input {...getInputProps()} />

        <Upload className="mx-auto mb-4 text-blue-400" size={60} />

        <p className="text-xl font-semibold">
          Drag & Drop your log file here
        </p>

        <p className="mt-2 text-slate-400">
          or click to browse
        </p>

        <p className="mt-6 text-sm text-slate-500">
          Supported: CSV, JSON
        </p>
      </div>

      {message && (
  <div className="mt-6 rounded-xl bg-green-600/20 p-6">

    <p className="text-green-400 font-semibold">
      {message}
    </p>

    <div className="mt-6 flex gap-4">

      <button
        onClick={() => navigate("/")}
        className="rounded-lg bg-cyan-600 px-6 py-3 hover:bg-cyan-500"
      >
        Dashboard
      </button>

      <button
        onClick={() => navigate("/uploaded")}
        className="rounded-lg bg-blue-600 px-6 py-3 hover:bg-blue-500"
      >
        View Logs
      </button>

      <button
        onClick={() => navigate("/investigation")}
        className="rounded-lg bg-purple-600 px-6 py-3 hover:bg-purple-500"
      >
        Start Investigation
      </button>

    </div>

  </div>
)}

      <UploadedLogs />
    </div>
  );
}