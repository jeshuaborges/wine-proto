import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Link } from "@remix-run/react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { formatDistanceToNow } from "date-fns";
import { getSegmentById } from "~/utils/segments";
import { SegmentTabsNav } from "~/components/segments/segment-tabs-nav";
import { SegmentUpdateStatus } from "~/components/segments/segment-update-status";

export async function loader({ params }: LoaderFunctionArgs) {
  const segment = getSegmentById(params.id || "");
  
  if (!segment) {
    throw new Response("Segment not found", { status: 404 });
  }

  return json({ segment });
}

export const handle = {
  breadcrumb: (data: { segment: Awaited<ReturnType<typeof getSegmentById>> }) => 
    data.segment?.name
};

export default function SegmentDetails() {
  const { segment } = useLoaderData<typeof loader>();

  if (!segment) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">{segment.name}</h1>
          <p className="text-sm text-muted-foreground sm:text-base">{segment.description}</p>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link to={`/segments/${segment.id}/edit`}>
              <Pencil2Icon className="mr-2 h-4 w-4" />
              Edit
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <SegmentTabsNav />
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Segment Information</CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="space-y-4">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Type</dt>
                  <dd className="text-lg capitalize">{segment.type}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Customer Count</dt>
                  <dd className="text-lg">{segment.customerCount?.toLocaleString()}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">Last Updated</dt>
                  <dd className="text-lg">
                    {formatDistanceToNow(new Date(segment.updatedAt), { addSuffix: true })}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>

          <SegmentUpdateStatus 
            type={segment.type}
            updateFrequency={segment.updateFrequency}
            lastUpdated={segment.updatedAt}
          />
        </div>
      </div>
    </div>
  );
}