import StatCard from "../components/dashboard/StatCard";
import dashboardStats from "../data/dashboard";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">

      <Sidebar />

      <div className="flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 p-8">

         <h1 className="text-4xl font-bold text-white">
  Security Overview
</h1>

<p className="mt-3 text-slate-400">
  Monitor your organization's current security posture.
</p>

<div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
  {dashboardStats.map((item) => {
    const Icon = item.icon;

    return (
      <StatCard
        key={item.title}
        title={item.title}
        value={item.value}
        subtitle={item.subtitle}
        icon={<Icon size={34} />}
      />
    );
  })}
</div>

        </main>

      </div>

    </div>
  );
}