import React, { useState } from "react";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Diagnosis } from "@/types/model";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paging: {
    totalPage: number;
  };
}
export default function useDataTableDiagnosis<TData extends Diagnosis, TValue>({
  columns,
  data,
  paging,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [rowSelection, setRowSelection] = React.useState({});
  const [paginationState, setPaginationState] = useState({
    pageIndex: Number(searchParams.get("page") || "1") - 1 || 0,
    pageSize: Number(searchParams.get("limit") || "10"),
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: paging?.totalPage || 0,
    state: {
      rowSelection,
      pagination: paginationState,
    },

    onPaginationChange: (updater) => {
      const nextPagination =
        typeof updater === "function" ? updater(paginationState) : updater;

      setPaginationState(nextPagination);

      const param = new URLSearchParams(searchParams);
      param.set("page", `${nextPagination.pageIndex + 1}`);

      if (nextPagination.pageSize !== 10) {
        param.set("limit", `${nextPagination.pageSize}`);
      }

      router.replace(`${pathname}?${param.toString()}`);
    },
    getRowId: (row) => row.id as string,
  });

  return { table, rowSelection };
}
