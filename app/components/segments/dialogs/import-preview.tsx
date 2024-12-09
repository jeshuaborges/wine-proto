import { Button } from "~/components/ui/button";
import type { BulkChangePreview } from "~/types/segment-history";

interface ImportPreviewProps {
  preview: BulkChangePreview;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ImportPreview({ preview, onCancel, onConfirm }: ImportPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="rounded-lg border p-4">
        <h3 className="mb-2 font-medium">Preview</h3>
        <dl className="grid grid-cols-2 gap-4">
          <div>
            <dt className="text-sm text-muted-foreground">To Add</dt>
            <dd className="text-2xl font-bold text-green-600">
              {preview.statistics.totalAdded}
            </dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">To Remove</dt>
            <dd className="text-2xl font-bold text-red-600">
              {preview.statistics.totalRemoved}
            </dd>
          </div>
        </dl>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onConfirm}>Confirm Import</Button>
      </div>
    </div>
  );
}