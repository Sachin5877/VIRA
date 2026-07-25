import { createContext, useContext, useEffect, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem("vira_notifications");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(
      "vira_notifications",
      JSON.stringify(notifications)
    );
  }, [notifications]);

  function addNotification(
    title,
    message,
    color = "border-cyan-500"
  ) {
    const item = {
      id: Date.now(),
      title,
      message,
      color,
    };

    setNotifications((prev) => [item, ...prev]);
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}