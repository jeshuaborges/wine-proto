import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { SegmentConditionBuilder } from "./condition-builder";
import { QueryPreview } from "./query-preview";
import type { CustomerQuery } from "~/types/customer-query";
import type { SegmentCondition } from "~/types/segment";
import type { QueryPreview as QueryPreviewType } from "~/types/customer-query";

interface QueryBuilderProps {
  initialQuery?: CustomerQuery;
}

export function QueryBuilder({ initialQuery }: QueryBuilderProps) {
  const [conditions, setConditions] = useState<SegmentCondition[]>(
    initialQuery?.conditions ?? []
  );
  const [isRunning, setIsRunning] = useState(false);
  const [preview, setPreview] = useState<QueryPreviewType | null>(null);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Query Conditions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <SegmentConditionBuilder
              conditions={conditions}
              onChange={setConditions}
            />
          </div>
        </CardContent>
      </Card>

      <QueryPreview
        isLoading={isRunning}
        preview={preview}
      />
    </div>
  );
}