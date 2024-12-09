import { type ReactNode } from "react";
import { Button } from "~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { mockSegments } from "~/data/mock-segments";

interface MoveCustomersDialogProps {
  trigger: ReactNode;
  onMove: (segmentId: string) => void;
}

export function MoveCustomersDialog({ trigger, onMove }: MoveCustomersDialogProps) {
  const manualSegments = mockSegments.filter(segment => segment.type === 'manual');

  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Move to Segment</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-2">
            {manualSegments.map((segment) => (
              <Button
                key={segment.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => onMove(segment.id)}
              >
                <div className="flex flex-col items-start">
                  <span>{segment.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {segment.customerCount} customers
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}