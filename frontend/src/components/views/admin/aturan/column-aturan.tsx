"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Rule } from "@/types/model";
import CellActionAturan from "./cell-action-aturan";

export const columns: ColumnDef<Rule>[] = [
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
    accessorKey: "diseaseId",
    header: "Penyakit",
    cell: ({ row }) => (
      <div className="uppercase py-2">{row.getValue("diseaseId")}</div>
    ),
  },
  {
    accessorKey: "symptomId",
    header: "Gejala",
  },

  {
    id: "Aksi",
    cell: ({ row }) => <CellActionAturan data={row.original} />,
    enableHiding: false,
  },
];
