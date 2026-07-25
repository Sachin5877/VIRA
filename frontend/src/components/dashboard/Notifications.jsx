import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {
  const { notifications } = useNotifications();

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Notifications
      </h2>

      {notifications.length === 0 ? (
        <div className="rounded-xl bg-slate-950 p-6 text-center">
          <p className="text-slate-500">
            No notifications yet.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div
              key={index}
              className={`rounded-xl border-l-4 ${item.color} bg-slate-950 p-4`}
            >
              <p className="font-semibold text-white">
                {item.title}
              </p>

              <p className="mt-1 text-sm text-slate-400">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}