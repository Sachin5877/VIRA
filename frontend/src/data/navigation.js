import {
  LayoutDashboard,
  FolderOpen,
  BrainCircuit,
  Shield,
  FileText,
  Clock3,
  Settings,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Log Center",
    icon: FolderOpen,
    path: "/logs",
  },
  {
    name: "AI Investigation Engine",
    icon: BrainCircuit,
    path: "/investigation",
  },
  {
    name: "ATT&CK Mapper",
    icon: Shield,
    path: "/attack-mapper",
  },
  {
    name: "Report Studio",
    icon: FileText,
    path: "/reports",
  },
  {
    name: "Timeline",
    icon: Clock3,
    path: "/timeline",
  },
  {
    name: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default navigation;