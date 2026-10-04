import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UploadLogs from "./pages/UploadLogs";
import LogViewer from "./pages/LogViewer";
import ViraChat from "./pages/ViraChat";
import ReportPage from "./pages/ReportPage";
import Login from "./pages/Login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected / Workspace Layout Routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/upload" element={<UploadLogs />} />
          <Route path="/viewer/:filename" element={<LogViewer />} />
          <Route path="/chat" element={<ViraChat />} />
          <Route path="/report" element={<ReportPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}