"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { Diagnosis } from "@/types/model";
import { formatDateIndo } from "@/utils/helpers";
import { Badge } from "@/components/ui/badge";
import CellActionDiagnosis from "./cell-action-diagnosis";

export const columns: ColumnDef<Diagnosis>[] = [
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
        className="data-[state=checked]:bg-orange-500 data-[state=checked]:text-white  border-gray-500"
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "username",
    header: "Nama Pengguna",
    enableHiding: false,
  },
  {
    accessorKey: "disease",
    header: "Penyakit",
    cell: ({ row }) => (
      <span className="block py-2">
        {row?.original?.disease?.map((d) => d).join(", ")}
      </span>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "scor",
    header: "Nilai",
    enableHiding: true,
  },
  {
    accessorKey: "status",
    id: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ row }) => (
      <Badge
        variant={`${
          row.getValue("status") === "finish"
            ? "default"
            : row.getValue("status") === "pending"
            ? "outline"
            : "destructive"
        }`}
        className="capitalize flex items-center justify-center w-[100px] mx-auto"
      >
        {row.getValue("status") === "finish"
          ? "selesai"
          : row.getValue("status") === "pending"
          ? "pending"
          : "batal"}
      </Badge>
    ),
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ row }) => (
      <span className="block py-2">
        {formatDateIndo(row.original.createdAt as Date)}
      </span>
    ),
    enableHiding: true,
  },

  {
    id: "Aksi",
    cell: ({ row }) => <CellActionDiagnosis data={row.original} />,
    enableHiding: false,
  },
];
