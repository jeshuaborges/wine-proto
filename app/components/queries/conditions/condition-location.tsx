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
import { Input } from "~/components/ui/input";
import { cn } from "~/lib/utils";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

interface ConditionLocationProps {
  value: string;
  operator: string;
  onChange: (value: string) => void;
  onOperatorChange: (operator: string) => void;
}

const locationOperators = [
  { value: "equals", label: "Equals" },
  { value: "contains", label: "Contains" },
  { value: "startsWith", label: "Starts With" },
  { value: "inRadius", label: "Within Distance" },
  { value: "notInRadius", label: "Outside Distance" },
  { value: "inState", label: "In State" },
  { value: "notInState", label: "Not In State" },
];

const states = [
  { value: "CA", label: "California" },
  { value: "OR", label: "Oregon" },
  { value: "WA", label: "Washington" },
  { value: "NV", label: "Nevada" },
  { value: "AZ", label: "Arizona" },
] as const;

export function ConditionLocation({ 
  value, 
  operator, 
  onChange, 
  onOperatorChange 
}: ConditionLocationProps) {
  const [open, setOpen] = React.useState(false);
  const [placesOpen, setPlacesOpen] = React.useState(false);

  const {
    ready,
    value: searchValue,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: "initMap",
    requestOptions: {
      componentRestrictions: { country: 'us' },
    },
    debounce: 300,
  });

  const selectedOperator = locationOperators.find(op => op.value === operator);

  const handleSelect = async (description: string) => {
    setValue(description, false);
    clearSuggestions();
    setPlacesOpen(false);

    try {
      const results = await getGeocode({ address: description });
      const { lat, lng } = await getLatLng(results[0]);
      onChange(JSON.stringify({
        address: description,
        lat,
        lng
      }));
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const renderValueInput = () => {
    if (operator === "inRadius" || operator === "notInRadius") {
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Distance"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1"
          />
          <span className="text-sm text-muted-foreground">miles</span>
        </div>
      );
    }

    if (operator === "inState" || operator === "notInState") {
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              className="w-full justify-between"
            >
              {states.find(state => state.value === value)?.label ?? "Select state..."}
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandInput placeholder="Search states..." />
              <CommandEmpty>No state found.</CommandEmpty>
              <CommandGroup>
                {states.map((state) => (
                  <CommandItem
                    key={state.value}
                    value={state.value}
                    onSelect={() => onChange(state.value)}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === state.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {state.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      );
    }

    // Google Places Autocomplete for location input
    return (
      <Popover open={placesOpen} onOpenChange={setPlacesOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={placesOpen}
            className="w-full justify-between"
          >
            {value ? JSON.parse(value).address : "Enter location..."}
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput
              placeholder="Search locations..."
              value={searchValue}
              onValueChange={setValue}
              disabled={!ready}
            />
            <CommandEmpty>
              {status === "ZERO_RESULTS" ? "No locations found." : "Enter a location..."}
            </CommandEmpty>
            <CommandGroup>
              {status === "OK" && data.map(({ place_id, description }) => (
                <CommandItem
                  key={place_id}
                  value={description}
                  onSelect={() => handleSelect(description)}
                >
                  {description}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
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
                {locationOperators.map((op) => (
                  <CommandItem
                    key={op.value}
                    value={op.value}
                    onSelect={() => {
                      onOperatorChange(op.value);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        operator === op.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {op.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-2">
        {renderValueInput()}
      </div>
    </div>
  );
}