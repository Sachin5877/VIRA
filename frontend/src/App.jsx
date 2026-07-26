import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "./layout/MainLayout";

import Dashboard from "./pages/Dashboard";
import UploadLogs from "./pages/UploadLogs";
import LogViewer from "./pages/LogViewer";
import ViraChat from "./pages/ViraChat";
import ReportPage from "./pages/ReportPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<MainLayout />}>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/upload"
            element={<UploadLogs />}
          />

          <Route
            path="/viewer/:filename"
            element={<LogViewer />}
          />

          <Route
            path="/chat"
            element={<ViraChat />}
          />

          <Route
            path="/report"
            element={<ReportPage />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}