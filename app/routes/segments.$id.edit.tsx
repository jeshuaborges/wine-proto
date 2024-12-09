import { type ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SegmentForm } from "~/components/segments/segment-form";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { getSegmentById } from "~/utils/segments";

export async function loader({ params }: ActionFunctionArgs) {
  const segment = getSegmentById(params.id || "");
  
  if (!segment) {
    throw new Response("Segment not found", { status: 404 });
  }

  return json({ segment });
}

export const handle = {
  breadcrumb: "Edit"
};

export async function action({ request, params }: ActionFunctionArgs) {
  const formData = await request.formData();
  
  // Mock updating segment - replace with actual API call
  console.log("Updating segment:", Object.fromEntries(formData));
  
  return redirect(`/segments/${params.id}`);
}

export default function EditSegment() {
  const { segment } = useLoaderData<typeof loader>();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Segment</h1>
        <p className="text-muted-foreground">Modify segment configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Segment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <SegmentForm type="edit" segment={segment} />
        </CardContent>
      </Card>
    </div>
  );
}