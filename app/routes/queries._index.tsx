import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { QueryList } from "~/components/queries/query-list";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Queries", path: "/queries" }
  ],
  actionButtons: (
    <Button asChild size="sm">
      <Link to="/queries/new">
        <PlusIcon className="mr-2 h-4 w-4" />
        New Query
      </Link>
    </Button>
  )
};

export default function QueriesIndex() {
  return (
    <div className="space-y-6">
      <QueryList />
    </div>
  );
}