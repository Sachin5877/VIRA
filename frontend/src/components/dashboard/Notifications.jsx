import { useNotifications } from "../../context/NotificationContext";
import { BellRing } from "lucide-react";
import Card from "../ui/Card";

export default function Notifications() {

  const { notifications } = useNotifications();

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <BellRing size={18} className="text-blue-600" />
          <h2 className="text-base font-bold text-slate-900">
            Notifications
          </h2>
        </div>
        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
          Activity log
        </span>
      </div>

      <div className="mt-4 space-y-2.5 flex-1 overflow-y-auto">
        {!notifications || notifications.length === 0 ? (
          <div className="rounded-lg bg-slate-50 border border-slate-200/80 p-6 text-center text-xs text-slate-500">
            No system notifications yet.
          </div>
        ) : (
          notifications.map((item, index) => (
            <div
              key={index}
              className="rounded-lg border border-slate-200/80 bg-slate-50/50 p-3.5 transition hover:bg-white hover:border-slate-300"
            >
              <p className="font-semibold text-xs text-slate-900">
                {item.title}
              </p>

              <p className="mt-1 text-xs text-slate-600">
                {item.message}
              </p>
            </div>
          ))
        )}
      </div>
    </Card>
  );
}