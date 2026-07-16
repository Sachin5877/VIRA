import { BrainCircuit, ShieldAlert, CheckCircle2 } from "lucide-react";
import investigation from "../../data/investigation";
import Card from "../ui/Card";

export default function InvestigationPanel() {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-blue-400" size={26} />
          <h2 className="text-xl font-semibold text-white">
            Investigation Workspace
          </h2>
        </div>

        <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-medium text-red-400">
          {investigation.status}
        </span>
      </div>

      <div className="mt-6">
        <p className="text-sm text-slate-400">Incident Summary</p>

        <p className="mt-2 leading-7 text-slate-200">
          {investigation.summary}
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-slate-400">MITRE ATT&CK</p>

          <div className="mt-2 flex items-center gap-2 text-white">
            <ShieldAlert className="text-orange-400" size={18} />
            {investigation.mitre}
          </div>
        </div>

        <div>
          <p className="text-sm text-slate-400">Confidence</p>

          <p className="mt-2 text-2xl font-bold text-green-400">
            {investigation.confidence}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <p className="text-sm text-slate-400">
          Recommended Actions
        </p>

        <div className="mt-4 space-y-3">
          {investigation.actions.map((action) => (
            <div
              key={action}
              className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950 p-3"
            >
              <CheckCircle2
                className="text-green-400"
                size={18}
              />

              <span className="text-slate-200">
                {action}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}