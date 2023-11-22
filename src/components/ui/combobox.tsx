"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
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
import { Address } from "wagmi";

import tokens from "@/tokens.json";

interface ComboboxProps {
  defaultValue: string;
  defaultPlaceholder: string;
  onChange?: (value: Address | undefined) => void;
}

export function Combobox({
  defaultValue,
  defaultPlaceholder,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Address | undefined>();

  React.useEffect(() => {
    onChange?.(value);
  }, [onChange, value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {value
            ? tokens.find(
                (tokens) => tokens.value.toLowerCase() === value.toLowerCase()
              )?.label
            : defaultValue}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={defaultPlaceholder} />
          <CommandEmpty>No tokens found.</CommandEmpty>
          <CommandGroup>
            {tokens.map((tokens) => (
              <CommandItem
                key={tokens.value}
                value={tokens.value}
                onSelect={(currentValue) => {
                  const newValue: Address = currentValue.startsWith("0x")
                    ? (currentValue as Address)
                    : `0x${currentValue}`;
                  setValue(newValue === value ? undefined : newValue);
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === tokens.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {tokens.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
