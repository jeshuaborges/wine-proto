import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { mockQueries } from "~/data/mock-queries";
import { QueryBuilder } from "~/components/queries/query-builder";
import { Button } from "~/components/ui/button";
import { Save, Play } from "lucide-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const query = mockQueries.find(q => q.id === params.id);
  
  if (!query) {
    throw new Response("Query not found", { status: 404 });
  }

  return json({ query });
}

export const handle = {
  breadcrumb: (data: { query: typeof mockQueries[0] }) => [
    { label: "Dashboard", path: "/" },
    { label: "Queries", path: "/queries" },
    { label: data.query.name, path: `/queries/${data.query.id}` }
  ],
  actionButtons: (
    <>
      <Button size="sm" variant="outline">
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button size="sm">
        <Play className="mr-2 h-4 w-4" />
        Run
      </Button>
    </>
  )
};

export default function QueryDetails() {
  const { query } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{query.name}</h1>
        <p className="text-muted-foreground">{query.description}</p>
      </div>
      <QueryBuilder initialQuery={query} />
    </div>
  );
}