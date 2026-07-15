import {
  ShieldAlert,
  SearchCheck,
  ShieldCheck,
  FileText,
} from "lucide-react";

const dashboardStats = [
  {
    title: "Critical Alerts",
    value: "08",
    subtitle: "+2 Today",
    icon: ShieldAlert,
  },
  {
    title: "Active Investigations",
    value: "12",
    subtitle: "5 In Progress",
    icon: SearchCheck,
  },
  {
    title: "Security Score",
    value: "86%",
    subtitle: "Excellent",
    icon: ShieldCheck,
  },
  {
    title: "Reports Generated",
    value: "24",
    subtitle: "This Week",
    icon: FileText,
  },
];

export default dashboardStats;