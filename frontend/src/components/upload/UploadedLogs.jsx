import { useEffect, useState } from "react";
import { FileText, ArrowRight } from "lucide-react";
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
    <div className="mt-8 rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Uploaded Security Log Files
          </h2>
          <p className="text-xs text-slate-500">
            Historical and active log files ready for automated inspection
          </p>
        </div>
        <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
          {files.length} {files.length === 1 ? "File" : "Files"}
        </span>
      </div>

      {files.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="mx-auto text-slate-300 mb-2" size={36} />
          <p className="text-sm font-medium text-slate-600">
            No uploaded logs found
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Uploaded CSV or JSON logs will show up here.
          </p>
        </div>
      ) : (
        <div className="mt-4 divide-y divide-slate-100">
          {files.map((file, index) => (
            <div
              key={index}
              className="py-3 flex items-center justify-between transition-colors hover:bg-slate-50/80 px-2 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                  <FileText size={18} />
                </div>

                <div className="min-w-0">
                  <h3 className="text-sm font-semibold text-slate-800 truncate">
                    {file.filename}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {file.size} KB
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-xs text-slate-500 hidden sm:inline-block">
                  {file.uploaded_at}
                </span>

                <button
                  onClick={() =>
                    navigate(`/viewer/${file.filename}`)
                  }
                  className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-2xs transition hover:bg-blue-700 cursor-pointer"
                >
                  <span>Inspect</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}