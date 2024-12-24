"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/components/ui/checkbox";
import { User } from "@/types/model";

import CellActionPengguna from "./cell-action-pengguna";
import { formatDateIndo, formatSplitName } from "@/utils/helpers";
import Image from "next/image";

export const columns: ColumnDef<User>[] = [
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
    accessorKey: "username",
    header: "Nama Pengguna",
    id: "Nama Pengguna",
    enableHiding: false,
  },
  {
    accessorKey: "photo",
    header: "Foto",
    id: "Foto",
    cell: ({ row }) => {
      return row.getValue("photo") ? (
        <figure className="w-[35px] h-[35px] rounded-full overflow-hidden bg-orange-300">
          <Image
            src={row.getValue("photo")}
            alt={row.getValue("username")}
            width={35}
            height={35}
            className="rounded-full w-full h-full object-cover"
            priority
          />
        </figure>
      ) : (
        <div className="w-[35px] h-[35px] rounded-full bg-orange-300 flex items-center justify-center">
          <span className="text-sm text-white uppercase">
            {formatSplitName(row.getValue("fullname"))}
          </span>
        </div>
      );
    },
    enableHiding: true,
  },
  {
    id: "Nama Lengkap",
    accessorKey: "fullname",
    header: "Nama Lengkap",
    enableHiding: true,
  },
  {
    accessorKey: "createdAt",
    id: "Tanggal",
    header: "Tanggal Dibuat",
    cell: ({ row }) => (
      <div className="">{formatDateIndo(row.getValue("createdAt"))}</div>
    ),
    enableHiding: true,
  },
  {
    id: "Aksi",
    cell: ({ row }) => <CellActionPengguna data={row.original} />,
    enableHiding: false,
  },
];
