import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload } from "lucide-react";
import { uploadLog } from "../services/uploadService";
import UploadedLogs from "../components/upload/UploadedLogs";
import { useNotifications } from "../context/NotificationContext";

export default function UploadLogs() {
  const [message, setMessage] = useState("");
  const { addNotification } = useNotifications();

  const onDrop = async (acceptedFiles) => {
    if (!acceptedFiles.length) return;

    try {
      const result = await uploadLog(acceptedFiles[0]);

      setMessage(result.message);

      // 🔔 Add Notification
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
        <div className="mt-6 rounded-lg bg-green-600/20 p-4 text-green-400">
          {message}
        </div>
      )}

      <UploadedLogs />
    </div>
  );
}