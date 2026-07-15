import navigation from "../../data/navigation";

export default function Sidebar() {
  return (
    <aside className="w-72 h-screen bg-slate-900 border-r border-slate-800 flex flex-col">
      
      <div className="p-6 border-b border-slate-800">
        <h1 className="text-2xl font-bold text-white">
          VIRA
        </h1>

        <p className="text-sm text-slate-400 mt-1">
          Intelligent Security Investigation Platform
        </p>
      </div>

      <nav className="flex-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.name}
              className="w-full flex items-center gap-3 rounded-xl px-4 py-3 mb-2 text-slate-300 hover:bg-slate-800 hover:text-white transition-all duration-300"
            >
              <Icon size={20} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-5">
        <div className="text-white font-semibold">
          Admin
        </div>

        <div className="text-slate-400 text-sm">
          Administrator
        </div>
      </div>

    </aside>
  );
}