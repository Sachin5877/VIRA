import Sidebar from "../components/layout/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-400">
          Welcome to VIRA.
        </p>
      </main>
    </div>
  );
}