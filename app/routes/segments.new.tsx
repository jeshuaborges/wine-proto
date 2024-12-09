import { type ActionFunctionArgs, redirect } from "@remix-run/node";
import { SegmentForm } from "~/components/segments/segment-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const handle = {
  breadcrumb: [
    { label: "Dashboard", path: "/" },
    { label: "Segments", path: "/segments" },
    { label: "New Segment", path: "/segments/new" }
  ]
};

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Mock creating a new segment - replace with actual API call
  console.log("Creating segment:", Object.fromEntries(formData));
  
  return redirect("/segments");
}

export default function NewSegment() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create Segment</h1>
        <p className="text-muted-foreground">Define a new customer segment</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Segment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SegmentForm type="create" />
        </CardContent>
      </Card>
    </div>
  );
}