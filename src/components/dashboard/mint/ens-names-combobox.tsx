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
import { EnsName } from "@/types";
import { useEffect, useState } from "react";

interface EnsNamesComboboxProps {
  ensNames: EnsName[];
  onChange: (value: EnsName | undefined) => void;
}

export function EnsNamesCombobox({
  ensNames,
  onChange,
}: EnsNamesComboboxProps) {
  const [open, setOpen] = useState(false);
  const [ensName, setValue] = useState<EnsName | undefined>(ensNames[0]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          disabled={ensName == undefined}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between">
          {ensName ? ensName.label : "Select an ENS"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search an ENS..." />
          <CommandEmpty>No ENS found.</CommandEmpty>
          <CommandGroup>
            {ensNames.map((ens) => (
              <CommandItem
                key={ens.value}
                value={ens.value}
                onSelect={(currentValue) => {
                  setValue(
                    currentValue === ensName?.value
                      ? undefined
                      : ensNames.find(
                          (ensName) => ensName.value === currentValue
                        )
                  );
                  setOpen(false);
                  onChange(ens);
                }}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    ensName?.value === ens.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {ens.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
