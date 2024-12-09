import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { OPERATORS, FIELD_CATEGORIES } from "~/constants/segment-conditions";

interface ConditionOperatorSelectProps {
  field?: string;
  value?: string;
  onChange: (value: string) => void;
}

export function ConditionOperatorSelect({ field, value, onChange }: ConditionOperatorSelectProps) {
  const getFieldType = (fieldPath?: string) => {
    if (!fieldPath) return null;
    const [category, field] = fieldPath.split('.');
    return FIELD_CATEGORIES[category as keyof typeof FIELD_CATEGORIES]
      ?.fields[field as string]?.type;
  };

  const fieldType = getFieldType(field);
  const operators = fieldType ? OPERATORS[fieldType as keyof typeof OPERATORS] : [];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger>
        <SelectValue placeholder="Select operator" />
      </SelectTrigger>
      <SelectContent>
        {operators.map((operator) => (
          <SelectItem key={operator.value} value={operator.value}>
            {operator.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}