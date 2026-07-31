import { useNotifications } from "../../context/NotificationContext";

export default function Notifications() {

  const { notifications } = useNotifications();

  return (

    <div className="rounded-2xl border border-[#334155] bg-[#1B263B] p-6">

      <h2 className="mb-6 text-xl font-bold text-[#F8FAFC]">
        Notifications
      </h2>

      {notifications.length === 0 ? (

        <div className="rounded-xl bg-[#111827] p-6 text-center">

          <p className="text-[#94A3B8]">
            No notifications yet.
          </p>

        </div>

      ) : (

        <div className="space-y-4">

          {notifications.map((item, index) => (

            <div
              key={index}
              className={`rounded-xl border-l-4 ${item.color} bg-[#111827] p-4 transition hover:border-[#14B8A6]`}
            >

              <p className="font-semibold text-[#F8FAFC]">
                {item.title}
              </p>

              <p className="mt-2 text-sm text-[#CBD5E1]">
                {item.message}
              </p>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}