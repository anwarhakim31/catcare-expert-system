"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Disease } from "@/types/model";
import Image from "next/image";
import CellActionPenyakit from "./cell-action-penyakit";

export const columns: ColumnDef<Disease>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white border-white"
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
    enableHiding: false,
  },
  {
    accessorKey: "image",
    header: "GAMBAR",
    cell: ({ row }) => {
      return (
        <div className="relative aspect-square max-w-12 h-12">
          <Image
            src={row.getValue("image")}
            alt={row.getValue("name")}
            fill
            className="rounded-sm object-cover"
            priority
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "NAMA PENYAKIT",
    enableHiding: false,
  },
  {
    accessorKey: "description",
    header: "DESKRIPSI",
  },
  {
    accessorKey: "solution",
    header: "SOLUSI",
  },
  {
    id: "Aksi",
    cell: ({ row }) => <CellActionPenyakit data={row.original} />,
    enableHiding: false,
  },
];
