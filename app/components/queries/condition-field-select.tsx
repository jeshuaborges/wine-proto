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
import { FIELD_CATEGORIES } from "~/constants/query-conditions";

interface ConditionFieldSelectProps {
  value?: string;
  onChange: (value: string) => void;
}

export function ConditionFieldSelect({ value, onChange }: ConditionFieldSelectProps) {
  const [open, setOpen] = React.useState(false);

  // Create a flat array of options with category labels
  const options = Object.entries(FIELD_CATEGORIES).flatMap(([categoryKey, category]) =>
    Object.entries(category.fields).map(([fieldKey, field]) => ({
      value: `${categoryKey}.${fieldKey}`,
      label: field.label,
      category: category.label,
    }))
  );

  const selectedOption = value ? options.find(option => option.value === value) : undefined;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedOption?.label ?? "Select field..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-[300px] p-0" 
        align="start"
        side="bottom"
        sideOffset={4}
        alignOffset={0}
        avoidCollisions={true}
      >
        <Command className="max-h-[300px] overflow-auto">
          <CommandInput placeholder="Search fields..." className="h-9" />
          <CommandEmpty>No field found.</CommandEmpty>
          {Object.entries(FIELD_CATEGORIES).map(([categoryKey, category]) => (
            <CommandGroup key={categoryKey} heading={category.label} className="px-2">
              {Object.entries(category.fields).map(([fieldKey, field]) => {
                const optionValue = `${categoryKey}.${fieldKey}`;
                return (
                  <CommandItem
                    key={optionValue}
                    value={optionValue}
                    onSelect={() => {
                      onChange(optionValue);
                      setOpen(false);
                    }}
                    className="px-2"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === optionValue ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {field.label}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          ))}
        </Command>
      </PopoverContent>
    </Popover>
  );
}