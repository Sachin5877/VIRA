import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadLogs from "./pages/UploadLogs";
import LogViewer from "./pages/LogViewer";
import ViraChat from "./pages/ViraChat";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/upload" element={<UploadLogs />} />
        <Route path="/viewer/:filename" element={<LogViewer />} />
        <Route path="/chat" element={<ViraChat />} />
      </Routes>
    </BrowserRouter>
  );
}