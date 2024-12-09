import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { PlusIcon } from "lucide-react";
import { SegmentList } from "~/components/segments/segment-list";
import { SegmentTabs } from "~/components/segments/segment-tabs";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Segments", path: "/segments" }
  ]
};

export default function SegmentsIndex() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold sm:text-3xl">Customer Segments</h1>
          <p className="text-sm text-muted-foreground sm:text-base">
            Create and manage customer segments for targeted marketing
          </p>
        </div>
        <Button asChild className="w-full sm:w-auto">
          <Link to="/segments/new">
            <PlusIcon className="mr-2 h-4 w-4" />
            Create Segment
          </Link>
        </Button>
      </div>
      <SegmentTabs />
      <SegmentList />
    </div>
  );
}