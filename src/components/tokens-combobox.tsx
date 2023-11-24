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

import tokensJSON from "@/tokens.json";
import { Contract, TokenOption } from "@/types";

interface ComboboxProps {
  defaultValue: TokenOption;
  defaultPlaceholder: string;
  onChange?: (value: Contract | undefined) => void;
}

const tokens: TokenOption[] = tokensJSON as TokenOption[];

export function TokensCombobox({
  defaultValue,
  defaultPlaceholder,
  onChange,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState<Contract | undefined>();

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
          className="w-[200px] justify-between dark:text-white">
          {value
            ? tokens.find(
                (tokens) =>
                  tokens.value.address.toLowerCase() ===
                  value.address.toLowerCase()
              )?.label
            : defaultValue.label}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={defaultPlaceholder} />
          <CommandEmpty>No tokens found.</CommandEmpty>
          <CommandGroup>
            {tokens.map((token) => (
              <CommandItem
                key={token.value.address}
                value={token.value.address}
                onSelect={(currentValue) => {
                  const newValue: Address = currentValue.startsWith("0x")
                    ? (currentValue as Address)
                    : `0x${currentValue}`;
                  setValue(
                    newValue === value?.address ? undefined : token.value
                  );
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value?.address === token.value.address ||
                      defaultValue.value.address === token.value.address
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                {token.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
