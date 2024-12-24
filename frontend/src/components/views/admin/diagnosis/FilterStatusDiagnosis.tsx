import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useMemo } from "react";

const status = [
  {
    value: "finish",
    label: "Selesai",
  },
  {
    value: "pending",
    label: "Proses",
  },
  {
    value: "cancel",
    label: "batal",
  },
];

const FilterStatusDiagnosis = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const select = useMemo(() => {
    return searchParams?.get("status") || "";
  }, [searchParams]);

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === select) {
      params?.delete("status");
    } else {
      params?.set("status", value);
    }

    router.replace(`/admin/diagnosis?${params.toString()}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="ml-auto text-sm hover:bg-orange-100"
        >
          <ListFilter className="mr-2 h-4 w-4" /> Status{" "}
          {select && (
            <span className="bg-orange-100 px-4 rounded-md">
              {select === "finish"
                ? "Selesai"
                : select === "pending"
                ? "Proses"
                : "Batal"}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup value={select} onValueChange={handleSelect}>
          {status.map((item) => (
            <DropdownMenuRadioItem key={item.value} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterStatusDiagnosis;
