export default function Notifications() {
  const notifications = [
    {
      title: "High Risk Alert",
      message: "Malware detected in uploaded logs.",
      color: "border-red-500",
    },
    {
      title: "IOC Extraction",
      message: "Indicators extracted successfully.",
      color: "border-yellow-500",
    },
    {
      title: "MITRE Mapping",
      message: "Techniques mapped successfully.",
      color: "border-cyan-500",
    },
    {
      title: "AI Investigation",
      message: "Investigation completed.",
      color: "border-green-500",
    },
  ];

  return (
    <div className="rounded-2xl bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Notifications
      </h2>

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
    </div>
  );
}