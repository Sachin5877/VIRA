import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { NotificationProvider } from "./context/NotificationContext";
import { DashboardProvider } from "./context/DashboardContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NotificationProvider>
  <DashboardProvider>
    <App />
  </DashboardProvider>
</NotificationProvider>
  </StrictMode>
);