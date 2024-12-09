import * as React from "react";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/dialog";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Checkbox } from "~/components/ui/checkbox";
import { Input } from "~/components/ui/input";
import { Search } from "lucide-react";
import { FIELD_CATEGORIES } from "~/constants/query-conditions";

interface AddConditionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (fields: string[]) => void;
}

export function AddConditionDialog({ open, onOpenChange, onAdd }: AddConditionDialogProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedFields, setSelectedFields] = React.useState<string[]>([]);

  // Reset selections when dialog opens
  React.useEffect(() => {
    if (open) {
      setSelectedFields([]);
      setSearchQuery("");
    }
  }, [open]);

  const handleSubmit = () => {
    onAdd(selectedFields);
    onOpenChange(false);
  };

  const toggleField = (fieldPath: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldPath)
        ? prev.filter(f => f !== fieldPath)
        : [...prev, fieldPath]
    );
  };

  const filteredCategories = Object.entries(FIELD_CATEGORIES).map(([categoryKey, category]) => ({
    ...category,
    key: categoryKey,
    fields: Object.entries(category.fields)
      .filter(([_, field]) =>
        field.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .map(([fieldKey, field]) => ({
        ...field,
        key: fieldKey,
        path: `${categoryKey}.${fieldKey}`,
      }))
  })).filter(category => category.fields.length > 0);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Conditions</DialogTitle>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search fields..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8"
          />
        </div>

        <ScrollArea className="h-[400px]">
          <div className="space-y-6">
            {filteredCategories.map((category) => (
              <div key={category.key}>
                <h4 className="mb-4 text-sm font-medium text-muted-foreground">
                  {category.label}
                </h4>
                <div className="grid gap-3">
                  {category.fields.map((field) => (
                    <div
                      key={field.path}
                      className="flex items-center space-x-2"
                    >
                      <Checkbox
                        id={field.path}
                        checked={selectedFields.includes(field.path)}
                        onCheckedChange={() => toggleField(field.path)}
                      />
                      <label
                        htmlFor={field.path}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {field.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={selectedFields.length === 0}
          >
            Add Selected ({selectedFields.length})
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}