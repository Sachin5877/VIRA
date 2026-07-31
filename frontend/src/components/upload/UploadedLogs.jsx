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

    <div className="mt-10 rounded-2xl border border-[#334155] bg-[#1B263B] p-6 shadow-xl">

      <h2 className="mb-6 text-2xl font-bold text-[#F8FAFC]">
        Recent Uploaded Logs
      </h2>

      {files.length === 0 ? (

        <p className="text-[#94A3B8]">
          No uploaded logs found.
        </p>

      ) : (

        <div className="space-y-4">

          {files.map((file, index) => (

            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-[#334155] bg-[#111827] p-4 transition hover:border-[#14B8A6]"
            >

              <div className="flex items-center gap-4">

                <FileText
                  className="text-[#14B8A6]"
                />

                <div>

                  <h3 className="font-semibold text-[#F8FAFC]">
                    {file.filename}
                  </h3>

                  <p className="text-sm text-[#94A3B8]">
                    {file.size} KB
                  </p>

                </div>

              </div>

              <div className="flex items-center gap-4">

                <span className="text-sm text-[#94A3B8]">

                  {file.uploaded_at}

                </span>

                <button
                  onClick={() =>
                    navigate(`/viewer/${file.filename}`)
                  }
                  className="rounded-lg bg-[#14B8A6] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0F766E]"
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