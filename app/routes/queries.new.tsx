import { QueryBuilder } from "~/components/queries/query-builder";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Queries", path: "/queries" },
    { label: "New Query", path: "/queries/new" }
  ]
};

export default function NewQuery() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Query</h1>
        <p className="text-muted-foreground">Create and test a new customer query</p>
      </div>
      <QueryBuilder />
    </div>
  );
}