import { MoreHorizontal, UserMinus, UserPlus, Copy } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "~/components/ui/dropdown-menu";
import { MoveCustomersDialog } from "./dialogs/move-customers-dialog";
import { CopyCustomersDialog } from "./dialogs/copy-customers-dialog";

interface CustomerBulkActionsMenuProps {
  selectedCount: number;
  onRemove: () => void;
  onMove: (segmentId: string) => void;
  onCopy: (segmentId: string) => void;
}

export function CustomerBulkActionsMenu({ 
  selectedCount,
  onRemove,
  onMove,
  onCopy,
}: CustomerBulkActionsMenuProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">
        {selectedCount} selected
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Actions
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={onRemove} className="text-destructive">
            <UserMinus className="mr-2 h-4 w-4" />
            Remove Selected
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          
          <MoveCustomersDialog
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <UserMinus className="mr-2 h-4 w-4" />
                Move to Segment
              </DropdownMenuItem>
            }
            onMove={onMove}
          />

          <CopyCustomersDialog
            trigger={
              <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                <Copy className="mr-2 h-4 w-4" />
                Copy to Segment
              </DropdownMenuItem>
            }
            onCopy={onCopy}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}