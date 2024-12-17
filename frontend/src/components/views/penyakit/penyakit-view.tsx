"use client";

import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import SectionLayout from "@/components/layouts/SectionLayout";
import React, { useEffect, useState } from "react";
import InputSearch from "@/components/ui/input-search";
import { Trash } from "lucide-react";
import Link from "next/link";
import { Disease } from "@/types/model";
import TablePagination from "@/components/fragments/TablePagination";
import { Paging } from "@/types/api";
import TableFragment from "@/components/fragments/Table";
import { ModalDelete } from "@/components/fragments/ModalDelete";
import useDeleteDisease from "@/hooks/penyakit/useDeleteDisease";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";
import TableSkeleton from "@/components/fragments/TableSkeleton";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paging: Paging;
  isLoading: boolean;
}

export function PenyakitView<TData extends Disease, TValue>({
  columns,
  data,
  paging,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const query = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [rowSelection, setRowSelection] = React.useState({});
  const [page, setPage] = React.useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });
  const [paginationState, setPaginationState] = useState({
    pageIndex: Number(searchParams.get("page") || "1") - 1 || 0,
    pageSize: Number(searchParams.get("limit") || "10"),
  });
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (paging) {
      setPage(paging);
    }
  }, [paging]);

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

  const { mutate, isPending } = useDeleteDisease();

  return (
    <SectionLayout>
      <h3 className="text-base font-medium ">Kelola dan lihat data penyakit</h3>
      <div className="flex justify-between items-center mb-8 mt-4 md:flex-nowrap flex-wrap gap-4">
        <InputSearch placeholder="Cari nama penyakit..." />
        <div className="w-full md:w-fit flex justify-between items-center gap-2">
          <button
            disabled={Object.values(rowSelection).length === 0 || isPending}
            onClick={() => setIsOpen(true)}
            className={`${
              Object.values(rowSelection).length > 0
                ? "pointer-events-auto opacity-1"
                : "pointer-events-none opacity-0"
            } w-8 h-8 border flex items-center justify-center rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-all ease-out duration-300`}
          >
            <Trash size={16} strokeWidth={1.5} className="" />
          </button>

          <Link href="/admin/penyakit/tambah" className="btn w-[150px]">
            Tambah
          </Link>
        </div>
      </div>
      {isLoading ? (
        <TableSkeleton table={table} column={20} py="py-6" />
      ) : (
        <>
          <TableFragment
            colSpan={Object.values(columns).length}
            table={table}
          />
          <TablePagination pagination={page} table={table} />
        </>
      )}

      <ModalDelete
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() =>
          mutate(
            { selected: Object.keys(rowSelection) },
            {
              onSuccess: () => {
                setIsOpen(false);
                table.resetRowSelection();
                query.invalidateQueries({ queryKey: ["disease"] });
                toast.success("Berhasil menghapus penyakit");
              },
              onError: (err) => {
                ResponseError(err);
              },
            }
          )
        }
        loading={false}
        desc={`Dengan menghapus ${
          Object.values(rowSelection).length
        } penyakit ini, semua data penyakit yang berkaitan dengan penyakit ini akan terhapus. Apakah anda yakin?`}
      />
    </SectionLayout>
  );
}
