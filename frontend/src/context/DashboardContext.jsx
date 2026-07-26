import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [stats, setStats] = useState({
    totalLogs: 0,
    uploadedFiles: 0,
    investigations: 0,
    reports: 0,
    highAlerts: 0,
    mitreTechniques: 0,
    securityScore: 100,
    recentAlerts: [],
    summary: "",
    eventDistribution: [],
severityDistribution: [],
  });

  return (
    <DashboardContext.Provider
      value={{
        stats,
        setStats,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  return useContext(DashboardContext);
}