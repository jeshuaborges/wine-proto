import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";

interface ConditionNumberProps {
  value: string | number;
  operator: string;
  unit?: string;
  onChange: (value: string) => void;
  onOperatorChange: (operator: string) => void;
}

export function ConditionNumber({ value, operator, unit, onChange, onOperatorChange }: ConditionNumberProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Operator</Label>
        <Select value={operator} onValueChange={onOperatorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="equals">Equals</SelectItem>
            <SelectItem value="greaterThan">Greater Than</SelectItem>
            <SelectItem value="lessThan">Less Than</SelectItem>
            <SelectItem value="between">Between</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Value</Label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          {unit && (
            <span className="text-sm text-muted-foreground">{unit}</span>
          )}
        </div>
      </div>
    </div>
  );
}