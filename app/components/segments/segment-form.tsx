import { Form } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import type { Segment } from "~/types/segment";
import { SegmentConditionBuilder } from "~/components/queries/condition-builder";
import { useState } from "react";

interface SegmentFormProps {
  segment?: Segment;
  type: "create" | "edit";
}

export function SegmentForm({ segment, type }: SegmentFormProps) {
  const [segmentType, setSegmentType] = useState(segment?.type || "manual");

  return (
    <Form method="post" className="space-y-8">
      <div className="grid gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Segment Name</Label>
          <Input
            id="name"
            name="name"
            defaultValue={segment?.name}
            placeholder="e.g., VIP Customers"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            defaultValue={segment?.description}
            placeholder="Describe the purpose of this segment"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Segment Type</Label>
          <Select 
            name="type" 
            defaultValue={segment?.type || "manual"}
            onValueChange={setSegmentType}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="manual">Manual Selection</SelectItem>
              <SelectItem value="dynamic">Dynamic Query</SelectItem>
              <SelectItem value="template">Template</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {segmentType !== "manual" && (
          <SegmentConditionBuilder conditions={segment?.conditions} />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <Button
          variant="outline"
          type="button"
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button type="submit">
          {type === "create" ? "Create Segment" : "Save Changes"}
        </Button>
      </div>
    </Form>
  );
}