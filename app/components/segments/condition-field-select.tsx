import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "~/components/ui/select";
import { FIELD_CATEGORIES } from "~/constants/segment-conditions";

interface ConditionFieldSelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ConditionFieldSelect({ value, onChange }: ConditionFieldSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select field" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(FIELD_CATEGORIES).map(([categoryKey, category]) => (
          <SelectGroup key={categoryKey}>
            <SelectLabel>{category.label}</SelectLabel>
            {Object.entries(category.fields).map(([fieldKey, field]) => (
              <SelectItem key={fieldKey} value={`${categoryKey}.${fieldKey}`}>
                {field.label}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}