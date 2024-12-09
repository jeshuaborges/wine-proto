import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Combobox } from "~/components/ui/combobox";

interface ConditionSelectProps {
  value: string;
  operator: string;
  options: Array<{ value: string; label: string }>;
  onChange: (value: string) => void;
  onOperatorChange: (operator: string) => void;
}

export function ConditionSelect({ value, operator, options, onChange, onOperatorChange }: ConditionSelectProps) {
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
            <SelectItem value="notEquals">Does Not Equal</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Value</Label>
        <Combobox
          options={options}
          value={value}
          onChange={onChange}
          placeholder="Select value..."
        />
      </div>
    </div>
  );
}