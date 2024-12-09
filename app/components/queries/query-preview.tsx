import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Skeleton } from "~/components/ui/skeleton";
import type { QueryPreview as QueryPreviewType } from "~/types/customer-query";

interface QueryPreviewProps {
  isLoading: boolean;
  preview: QueryPreviewType | null;
}

export function QueryPreview({ isLoading, preview }: QueryPreviewProps) {
  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <Skeleton className="h-[100px]" />
            <Skeleton className="h-[100px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!preview) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Query Results</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            Configure your query conditions above and click "Run Query" to see matching customers
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Query Results</CardTitle>
        <div className="text-sm text-muted-foreground">
          Executed in {preview.executionTime}s
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <p className="text-2xl font-bold">
              {preview.totalMatches.toLocaleString()}
            </p>
            <p className="text-sm text-muted-foreground">
              Matching customers
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Sample Results</h3>
          <div className="grid gap-4 md:grid-cols-2">
            {preview.sampleMatches.map((match) => (
              <div key={match.id} className="rounded-lg border p-4">
                <div className="space-y-1">
                  <p className="font-medium">{match.name}</p>
                  <p className="text-sm text-muted-foreground">{match.email}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {match.matchedConditions.map((condition, i) => (
                    <span
                      key={i}
                      className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium"
                    >
                      {condition}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}