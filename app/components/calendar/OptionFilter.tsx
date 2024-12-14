import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";

interface Option {
  value: string;
  label: string;
}

interface OptionFilterProps {
  options: Option[];
  selectedOption: string;
  onOptionChange: (value: string) => void;
}

export function OptionFilter({
  options,
  selectedOption,
  onOptionChange,
}: OptionFilterProps) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[250px] justify-between"
        >
          {selectedOption
            ? options.find((option) => option.value === selectedOption)?.label
            : "Toutes les options"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher une option..." />
          <CommandEmpty>Aucune option trouvée.</CommandEmpty>
          <CommandGroup>
            <CommandItem
              onSelect={() => {
                onOptionChange("");
                setOpen(false);
              }}
            >
              <Check
                className={cn(
                  "mr-2 h-4 w-4",
                  !selectedOption ? "opacity-100" : "opacity-0"
                )}
              />
              Toutes les options
            </CommandItem>
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onOptionChange(
                    option.value === selectedOption ? "" : option.value
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedOption === option.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
