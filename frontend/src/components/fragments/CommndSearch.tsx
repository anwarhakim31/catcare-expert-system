"use client";

import * as React from "react";
import { Search } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { NavItem } from "./sidebar";
import Link from "next/link";

export function CommandSearch() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <button
        aria-label="search"
        className="hidden text-sm md:flex items-center gap-2 bg-white hover:bg-orange-50 w-[220px] h-8 rounded-md border px-2"
        onClick={() => setOpen(true)}
      >
        <Search size={18} strokeWidth={1.5} />
        <span className="font-light">Cari...</span>
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            {NavItem.map((item) => (
              <CommandItem key={item.id}>
                <Link
                  href={item.path}
                  className="flex items-center gap-2 w-full"
                  onClick={() => setOpen(false)}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
