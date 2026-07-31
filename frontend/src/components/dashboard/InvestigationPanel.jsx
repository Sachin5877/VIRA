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

        <div className="flex h-full items-center justify-center">

          <div className="text-center">

            <BrainCircuit
              size={60}
              className="mx-auto text-[#14B8A6]"
            />

            <h2 className="mt-4 text-xl font-semibold text-[#F8FAFC]">
              No Investigation Available
            </h2>

            <p className="mt-2 text-[#94A3B8]">
              Upload logs and start an investigation.
            </p>

          </div>

        </div>

      </Card>
    );
  }

  return (

    <Card className="h-full">

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <BrainCircuit
            className="text-[#14B8A6]"
            size={28}
          />

          <h2 className="text-xl font-semibold text-[#F8FAFC]">
            Investigation Workspace
          </h2>

        </div>

        <span className="rounded-full bg-red-500/20 px-3 py-1 text-sm font-semibold text-[#EF4444]">
          {investigation.severity}
        </span>

      </div>

      <div className="mt-6">

        <p className="text-sm text-[#94A3B8]">
          Incident Summary
        </p>

        <p className="mt-2 leading-7 text-[#E5E7EB]">
          {investigation.summary}
        </p>

      </div>

      <div className="mt-8 grid grid-cols-2 gap-6">

        <div>

          <p className="text-sm text-[#94A3B8]">
            MITRE ATT&CK
          </p>

          <div className="mt-3 space-y-2">

            {investigation.mitre?.map((m) => (

              <div
                key={m.id}
                className="flex items-center gap-2 text-[#F8FAFC]"
              >

                <ShieldAlert
                  className="text-[#F59E0B]"
                  size={18}
                />

                {m.id} - {m.name}

              </div>

            ))}

          </div>

        </div>

        <div>

          <p className="text-sm text-[#94A3B8]">
            Confidence
          </p>

          <p className="mt-2 text-3xl font-bold text-[#22C55E]">
            {investigation.confidence}%
          </p>

        </div>

      </div>

      <div className="mt-8">

        <p className="text-sm text-[#94A3B8]">
          Recommended Actions
        </p>

        <div className="mt-4 space-y-3">

          {investigation.recommendations?.map((action) => (

            <div
              key={action}
              className="flex items-center gap-3 rounded-xl border border-[#334155] bg-[#111827] p-4 transition hover:border-[#14B8A6]"
            >

              <CheckCircle2
                className="text-[#22C55E]"
                size={18}
              />

              <span className="text-[#E5E7EB]">
                {action}
              </span>

            </div>

          ))}

        </div>

      </div>

    </Card>

  );

}