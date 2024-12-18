"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { FieldValues } from "react-hook-form";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

import { FormControl } from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";

const SelectSearchOption = ({
  field,
  data,
  isLoading,
  placeholder,
}: {
  field: FieldValues;
  data: { id: string; value: string }[];
  isLoading: boolean;
  placeholder: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (itemValue: string) => {
    field.onChange(itemValue);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn(
              "w-full h-9 p-2 justify-between text-sm font-normal hover:text-muted-foreground hover:bg-transparent",
              !field.value && "text-muted-foreground"
            )}
            onClick={() => setIsOpen(true)}
            disabled={isLoading}
          >
            {field.value
              ? data?.find((item) => item.value === field.value)?.value
              : placeholder}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="popover-content-width-full p-0 max-h-36 translate-y-0">
        <Command>
          <CommandInput placeholder={`Cari...`} className="h-9 text-sm" />

          <CommandList>
            <CommandEmpty className="text-sm mt-2 text-center">
              Data tidak ditemukan.
            </CommandEmpty>

            <CommandGroup>
              {data?.map((item) => (
                <CommandItem
                  className="text-sm"
                  value={item.value}
                  key={item?.id}
                  onSelect={() => {
                    handleSelect(item.value);
                  }}
                >
                  {item.value}
                  <Check
                    className={cn(
                      "ml-auto",
                      item.value === field.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectSearchOption;
