import type { MetaFunction } from "@remix-run/node";
import { StatCard } from "~/components/dashboard/stat-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Admin Dashboard" },
    { name: "description", content: "Admin dashboard interface" },
  ];
};

export const handle = {
  breadcrumb: [{ label: "Dashboard", path: "/" }]
};

const stats = [
  { title: "Total Users", value: "1,234" },
  { title: "Active Sessions", value: "56" },
  { title: "Revenue", value: "$12,345" },
  { title: "Growth", value: "+23%" },
];

export default function Index() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </div>
  );
}