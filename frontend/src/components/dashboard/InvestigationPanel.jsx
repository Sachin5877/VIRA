import {
  BrainCircuit,
  ShieldAlert,
  CheckCircle2,
} from "lucide-react";

import Card from "../ui/Card";
import { useDashboard } from "../../context/DashboardContext";

export default function InvestigationPanel() {

  const { investigation } = useDashboard();

  if (!investigation) {
    return (
      <Card className="h-full">
        <div className="flex h-full min-h-[300px] items-center justify-center">
          <div className="text-center p-6">
            <div className="mx-auto h-14 w-14 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 mb-3">
              <BrainCircuit size={28} />
            </div>

            <h2 className="text-lg font-semibold text-slate-800">
              No Investigation Active
            </h2>

            <p className="mt-1.5 text-sm text-slate-500 max-w-sm">
              Upload log files and initiate automated AI correlation to generate threat analysis.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900 leading-tight">
              Investigation Workspace
            </h2>
            <p className="text-xs text-slate-500">Autonomous Incident Response</p>
          </div>
        </div>

        <span className="rounded-full bg-red-50 border border-red-200 px-3 py-1 text-xs font-semibold text-red-700">
          Severity: {investigation.severity}
        </span>
      </div>

      <div className="mt-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Incident Summary
        </p>

        <p className="mt-2 text-sm leading-relaxed text-slate-700 bg-slate-50 p-3.5 rounded-lg border border-slate-200/80">
          {investigation.summary}
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            MITRE ATT&CK
          </p>

          <div className="mt-2.5 space-y-2">
            {investigation.mitre?.map((m) => (
              <div
                key={m.id}
                className="flex items-center gap-2 text-xs font-medium text-slate-800"
              >
                <ShieldAlert
                  className="text-amber-600 shrink-0"
                  size={15}
                />
                <span className="font-semibold text-blue-700">{m.id}</span>
                <span className="text-slate-600 truncate">{m.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-3.5 rounded-lg border border-slate-200/80 bg-slate-50/50 flex flex-col justify-between">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
            Detection Confidence
          </p>

          <div className="my-auto py-2">
            <p className="text-3xl font-extrabold text-emerald-600">
              {investigation.confidence}%
            </p>
            <p className="text-xs text-slate-500 mt-1">High fidelity automated assessment</p>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">
          Recommended Actions
        </p>

        <div className="mt-3 space-y-2">
          {investigation.recommendations?.map((action) => (
            <div
              key={action}
              className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 text-xs font-medium text-slate-700 shadow-2xs hover:border-blue-300 transition"
            >
              <CheckCircle2
                className="text-emerald-600 shrink-0"
                size={16}
              />
              <span>{action}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}