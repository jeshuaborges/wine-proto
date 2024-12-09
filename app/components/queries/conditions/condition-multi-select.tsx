import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Badge } from "~/components/ui/badge";

interface ConditionMultiSelectProps {
  value: string[];
  operator: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string[]) => void;
  onOperatorChange: (operator: string) => void;
}

export function ConditionMultiSelect({ 
  value, 
  operator, 
  options, 
  onChange, 
  onOperatorChange 
}: ConditionMultiSelectProps) {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Operator</Label>
        <Select value={operator} onValueChange={onOperatorChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select operator" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="includes">Includes</SelectItem>
            <SelectItem value="excludes">Excludes</SelectItem>
            <SelectItem value="includesAll">Includes All</SelectItem>
            <SelectItem value="includesAny">Includes Any</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Values</Label>
        <div className="flex flex-wrap gap-2">
          {value.map((v) => {
            const option = options.find((o) => o.value === v);
            return (
              <Badge key={v} variant="secondary">
                {option?.label || v}
              </Badge>
            );
          })}
        </div>
        <Select
          value={value[value.length - 1]}
          onValueChange={(v) => onChange([...value, v])}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select values" />
          </SelectTrigger>
          <SelectContent>
            {options
              .filter((option) => !value.includes(option.value))
              .map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}