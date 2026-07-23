import Card from "../ui/Card";
import quickActions from "../../data/quickActions";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {
  const navigate = useNavigate();

  return (
    <Card>
      <h2 className="text-xl font-semibold text-white">
        Quick Actions
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-800 bg-slate-950 p-6 transition-all duration-300 hover:border-blue-500 hover:-translate-y-1"
            >
              <Icon size={32} className={action.color} />

              <span className="mt-3 text-sm font-medium text-white text-center">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}