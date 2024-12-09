import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "~/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/components/ui/popover";
import { cn } from "~/lib/utils";
import { createFieldType } from "~/queries/field-types";
import { FIELD_CATEGORIES } from "~/constants/query-conditions";

interface ConditionOperatorSelectProps {
  field?: string;
  value?: string;
  onChange: (value: string) => void;
}

export function ConditionOperatorSelect({ field, value, onChange }: ConditionOperatorSelectProps) {
  const [open, setOpen] = React.useState(false);

  const getFieldConfig = (fieldPath?: string) => {
    if (!fieldPath) return null;
    const [category, fieldKey] = fieldPath.split('.');
    return FIELD_CATEGORIES[category as keyof typeof FIELD_CATEGORIES]
      ?.fields[fieldKey as string];
  };

  const fieldConfig = getFieldConfig(field);
  const fieldType = fieldConfig ? createFieldType(fieldConfig) : null;
  const operators = fieldType?.getOperators() || [];

  const selectedOperator = value ? operators.find(op => op.value === value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
          disabled={!field}
        >
          {selectedOperator?.label ?? "Select operator..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <CommandInput placeholder="Search operators..." />
          <CommandEmpty>No operator found.</CommandEmpty>
          <CommandGroup>
            {operators.map((operator) => (
              <CommandItem
                key={operator.value}
                value={operator.value}
                onSelect={() => {
                  onChange(operator.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === operator.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {operator.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}