import {
  Upload,
  BrainCircuit,
  Shield,
  FileText,
} from "lucide-react";

const quickActions = [
  {
    title: "Upload Logs",
    icon: Upload,
    color: "text-blue-400",
  },
  {
    title: "Start Investigation",
    icon: BrainCircuit,
    color: "text-cyan-400",
  },
  {
    title: "MITRE ATT&CK Mapper",
    icon: Shield,
    color: "text-orange-400",
  },
  {
    title: "Generate Report",
    icon: FileText,
    color: "text-green-400",
  },
];

export default quickActions;