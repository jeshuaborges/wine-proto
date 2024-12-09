import * as React from "react";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { PlusIcon, XIcon } from "lucide-react";
import type { SegmentCondition } from "~/types/segment";
import { ConditionFieldSelect } from "./condition-field-select";
import { ConditionOperatorSelect } from "./condition-operator-select";
import { ConditionValueInput } from "./condition-value-input";
import { AddConditionDialog } from "./add-condition-dialog";

interface SegmentConditionBuilderProps {
  conditions?: SegmentCondition[];
  onChange?: (conditions: SegmentCondition[]) => void;
}

export function SegmentConditionBuilder({ conditions = [], onChange }: SegmentConditionBuilderProps) {
  const [localConditions, setLocalConditions] = React.useState(conditions);
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  const updateConditions = (newConditions: SegmentCondition[]) => {
    setLocalConditions(newConditions);
    onChange?.(newConditions);
  };

  const handleAddFields = (fields: string[]) => {
    const newConditions = [
      ...localConditions,
      ...fields.map(field => ({ field, operator: "", value: "" }))
    ];
    updateConditions(newConditions);
  };

  const removeCondition = (index: number) => {
    updateConditions(localConditions.filter((_, i) => i !== index));
  };

  const updateCondition = (index: number, updates: Partial<SegmentCondition>) => {
    updateConditions(
      localConditions.map((condition, i) =>
        i === index ? { ...condition, ...updates } : condition
      )
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Conditions</Label>
        <Button 
          type="button" 
          variant="outline" 
          size="sm" 
          onClick={() => setIsAddDialogOpen(true)}
        >
          <PlusIcon className="mr-2 h-4 w-4" />
          Add Condition
        </Button>
      </div>

      {localConditions.map((condition, index) => (
        <div key={index} className="grid gap-4 rounded-lg border p-4">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Field</Label>
              <ConditionFieldSelect
                value={condition.field}
                onChange={(value) => {
                  updateCondition(index, { field: value, operator: "", value: "" });
                }}
              />
            </div>

            <div className="space-y-2">
              <Label>Operator</Label>
              <ConditionOperatorSelect
                field={condition.field}
                value={condition.operator}
                onChange={(value) => updateCondition(index, { operator: value, value: "" })}
              />
            </div>

            <div className="space-y-2">
              <Label>Value</Label>
              <div className="flex gap-2">
                <ConditionValueInput
                  field={condition.field}
                  operator={condition.operator}
                  value={condition.value}
                  onChange={(value) => updateCondition(index, { value })}
                  onOperatorChange={(operator) => updateCondition(index, { operator, value: "" })}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCondition(index)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <AddConditionDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        onAdd={handleAddFields}
      />
    </div>
  );
}