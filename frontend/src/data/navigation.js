import {
  LayoutDashboard,
  Upload,
  FolderOpen,
  BrainCircuit,
  FileText,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Upload Logs",
    icon: Upload,
    path: "/upload",
  },
  {
    name: "VIRA Chat",
    icon: BrainCircuit,
    path: "/chat",
  },
  {
    name: "Reports",
    icon: FileText,
    path: "/report",
  },
];

export default navigation;