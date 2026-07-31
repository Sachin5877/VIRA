import Card from "../ui/Card";
import quickActions from "../../data/quickActions";
import { useNavigate } from "react-router-dom";

export default function QuickActions() {

  const navigate = useNavigate();

  return (
    <Card>

      <h2 className="text-xl font-semibold text-[#F8FAFC]">
        Quick Actions
      </h2>

      <div className="mt-6 grid grid-cols-2 gap-4">

        {quickActions.map((action) => {

          const Icon = action.icon;

          return (

            <button
              key={action.title}
              onClick={() => navigate(action.path)}
              className="flex flex-col items-center justify-center rounded-xl border border-[#334155] bg-[#111827] p-6 transition-all duration-300 hover:border-[#14B8A6] hover:bg-[#162032] hover:-translate-y-1"
            >

              <Icon
                size={32}
                className="text-[#14B8A6]"
              />

              <span className="mt-3 text-center text-sm font-medium text-[#F8FAFC]">
                {action.title}
              </span>

            </button>

          );

        })}

      </div>

    </Card>
  );
}