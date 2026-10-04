import Card from "../ui/Card";
import quickActions from "../../data/quickActions";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Quick Actions
          </h2>
          <p className="text-xs text-slate-500">
            Frequently accessed incident response operations
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 flex-1">
        {quickActions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center rounded-xl border border-slate-200/90 bg-slate-50/50 p-4 transition-all duration-150 hover:bg-white hover:border-blue-300 hover:shadow-xs group cursor-pointer text-center"
            >
              <div className="h-10 w-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-blue-600 group-hover:bg-blue-50 group-hover:border-blue-200 transition">
                <Icon size={20} />
              </div>

              <span className="mt-2.5 text-xs font-semibold text-slate-700 group-hover:text-blue-700">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}