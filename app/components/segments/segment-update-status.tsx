import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { formatDistanceToNow } from "date-fns";
import { RefreshCw } from "lucide-react";
import { useState } from "react";
import { useToast } from "~/hooks/use-toast";

interface SegmentUpdateStatusProps {
  type: string;
  updateFrequency?: string;
  lastUpdated: string;
}

export function SegmentUpdateStatus({ type, updateFrequency, lastUpdated }: SegmentUpdateStatusProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const { toast } = useToast();

  const handleManualUpdate = async () => {
    setIsUpdating(true);
    
    // Simulate update process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Segment Updated",
      description: "The segment has been updated with the latest matching customers.",
    });
    
    setIsUpdating(false);
  };

  if (type !== "dynamic") return null;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Last Updated</p>
            <p className="text-sm text-muted-foreground">
              {formatDistanceToNow(new Date(lastUpdated), { addSuffix: true })}
            </p>
            {updateFrequency && (
              <p className="text-xs text-muted-foreground">
                Updates {updateFrequency}
              </p>
            )}
          </div>
          {(!updateFrequency || updateFrequency === "manual") && (
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleManualUpdate}
              disabled={isUpdating}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${isUpdating ? "animate-spin" : ""}`} />
              Update Now
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}