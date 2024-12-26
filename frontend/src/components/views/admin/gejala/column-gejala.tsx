"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Symptom } from "@/types/model";
import CellActionGejala from "./cell-action-gejala";

export const columns: ColumnDef<Symptom>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-orange-500  data-[state=checked]:text-white border-white"
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white border-gray-500"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => (
      <div className="uppercase py-2">{row.getValue("id")}</div>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "symptom",
    header: "Gejala",
    enableHiding: false,
  },

  {
    id: "Aksi",
    cell: ({ row }) => <CellActionGejala data={row.original} />,
    enableHiding: false,
  },
];
