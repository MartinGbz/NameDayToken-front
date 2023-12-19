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

import { TokenOption } from "@/types";
import { useParams, useRouter } from "next/navigation";

interface ComboboxProps {
  tokens: TokenOption[];
  defaultPlaceholder: string;
  onChange?: (value: Address | undefined) => void;
}

export function TokensCombobox({
  tokens,
  defaultPlaceholder,
  onChange,
}: ComboboxProps) {
  const router = useRouter();
  const { id: tokenAddress } = useParams<{ id: Address }>();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<Address | undefined>(
    tokenAddress ?? tokens[0].address
  );

  // update the combobox value when the tokenAddress url changes
  useEffect(() => {
    if (!tokenAddress) return;
    setValue(tokenAddress);
  }, [tokenAddress]);

  // allow the redirection to the token page:
  // - when the user selects a token from the combobox
  // - when the user selects a token from the url
  // - when the user is on the home page, the redirection will be on the first token
  useEffect(() => {
    onChange?.(value);
    console.log("router puuuuush");
    router.push(`/token/${value}`);
  }, [onChange, router, value]);

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
                (tokens) => tokens.address.toLowerCase() === value.toLowerCase()
              )?.name
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
                key={token.address}
                value={token.address}
                onSelect={(currentValue) => {
                  const newValue: Address = currentValue.startsWith("0x")
                    ? (currentValue as Address)
                    : `0x${currentValue}`;
                  setValue(
                    newValue.toLowerCase() === value?.toLowerCase()
                      ? newValue
                      : token.address
                  );
                  setOpen(false);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === token.address ? "opacity-100" : "opacity-0"
                  )}
                />
                {token.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
