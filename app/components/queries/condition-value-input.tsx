import { Input } from "~/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { FIELD_CATEGORIES } from "~/constants/query-conditions";
import { ConditionLocation } from "./conditions/condition-location";
import { createFieldType } from "~/queries/field-types";

interface ConditionValueInputProps {
  field?: string;
  operator?: string;
  value?: string | number;
  onChange: (value: string) => void;
  onOperatorChange?: (operator: string) => void;
}

export function ConditionValueInput({ 
  field, 
  operator = "", 
  value = "", 
  onChange,
  onOperatorChange 
}: ConditionValueInputProps) {
  if (!field) return null;

  const [category, fieldKey] = field.split('.');
  const fieldConfig = FIELD_CATEGORIES[category as keyof typeof FIELD_CATEGORIES]
    ?.fields[fieldKey as string];

  if (!fieldConfig) return null;

  // Special handling for location field
  if (fieldConfig.type === "location") {
    return (
      <ConditionLocation
        value={value.toString()}
        operator={operator}
        onChange={onChange}
        onOperatorChange={onOperatorChange || (() => {})}
      />
    );
  }

  switch (fieldConfig.type) {
    case "number":
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          {fieldConfig.unit && (
            <span className="text-sm text-muted-foreground">{fieldConfig.unit}</span>
          )}
        </div>
      );
    
    case "date":
      return (
        <Input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );

    case "select":
      return (
        <Select value={value?.toString()} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select value" />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    case "multiSelect":
      return (
        <Select value={value?.toString()} onValueChange={onChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select values" />
          </SelectTrigger>
          <SelectContent>
            {fieldConfig.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );

    default:
      return (
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      );
  }
}