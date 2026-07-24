import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  function addNotification(title, message, color = "border-cyan-500") {
    const item = {
      id: Date.now(),
      title,
      message,
      color,
    };

    setNotifications((prev) => [item, ...prev]);
  }

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        addNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  return useContext(NotificationContext);
}