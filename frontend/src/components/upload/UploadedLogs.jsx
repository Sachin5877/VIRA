import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { getFiles } from "../../services/fileService";
import { useNavigate } from "react-router-dom";
export default function UploadedLogs() {
  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const data = await getFiles();
      setFiles(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="mt-10 rounded-2xl bg-slate-900 p-6 shadow-lg">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Recent Uploaded Logs
      </h2>

      {files.length === 0 ? (
        <p className="text-slate-400">
          No uploaded logs found.
        </p>
      ) : (
        <div className="space-y-4">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-slate-700 bg-slate-800 p-4"
            >
              <div className="flex items-center gap-4">
                <FileText className="text-cyan-400" />

                <div>
                  <h3 className="font-semibold text-white">
                    {file.filename}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {file.size} KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
  <span className="text-sm text-slate-500">
    {file.uploaded_at}
  </span>

  <button
    onClick={() => navigate(`/viewer/${file.filename}`)}
    className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium hover:bg-cyan-500 transition"
  >
    View
  </button>
</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}