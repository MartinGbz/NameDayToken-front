"use client";

import { useState, useEffect } from "react";
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
import { TokenOption } from "@/types";
import { useParams } from "next/navigation";

interface ComboboxProps {
  defaultPlaceholder: string;
  onChange: (value: Address | undefined) => void;
}

const tokens: TokenOption[] = tokensJSON as TokenOption[];

export function TokensCombobox({
  defaultPlaceholder,
  onChange,
}: ComboboxProps) {
  const { id: tokenAddress } = useParams<{ id: Address }>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Address | undefined>(
    tokenAddress ?? tokens[0].value
  );

  useEffect(() => {
    if (!tokenAddress) return;
    setValue(tokenAddress);
  }, [tokenAddress]);

  useEffect(() => {
    onChange(value);
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
                (tokens) => tokens.value.toLowerCase() === value.toLowerCase()
              )?.label
            : "Select a token"}
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
                key={token.value}
                value={token.value}
                onSelect={(currentValue) => {
                  const newValue: Address = currentValue.startsWith("0x")
                    ? (currentValue as Address)
                    : `0x${currentValue}`;
                  setValue(
                    newValue.toLowerCase() === value?.toLowerCase()
                      ? undefined
                      : token.value
                  );
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === token.value ? "opacity-100" : "opacity-0"
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
