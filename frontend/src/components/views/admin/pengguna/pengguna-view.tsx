import TableFragment from "@/components/fragments/Table";
import TablePagination from "@/components/fragments/TablePagination";
import TableSkeleton from "@/components/fragments/TableSkeleton";
import SectionLayout from "@/components/layouts/SectionLayout";

import InputSearch from "@/components/ui/input-search";

import { Paging } from "@/types/api";
import { User } from "@/types/model";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Fragment, useState } from "react";

import { ModalDelete } from "@/components/fragments/modal-delete";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";
import useDataTablePengguna from "@/hooks/user/useDataTablePengguna";
import useDeleteUser from "@/hooks/user/useDeleteSymptom";
import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paging: Paging;
  isLoading: boolean;
}

export function PenggunaView<TData extends User, TValue>({
  columns,
  data,
  paging,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [isDeleting, setIsDeleting] = useState(false);
  const { rowSelection, table } = useDataTablePengguna({
    columns,
    data,
    paging,
  });

  const { mutate, isPending } = useDeleteUser();
  const query = useQueryClient();

  return (
    <Fragment>
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={() =>
          mutate(
            {
              selected: Object.keys(rowSelection),
            },
            {
              onSuccess: () => {
                query.invalidateQueries({ queryKey: ["user"] });
                setIsDeleting(false);
                table.resetRowSelection();
                toast.success("Berhasil menghapus pengguna");
              },
              onError: (err) => {
                ResponseError(err);
              },
            }
          )
        }
        loading={isPending}
        desc={`Dengan menghapus ${
          Object.values(rowSelection).length
        } gejala ini, semua data gejala yang berkaitan dengan gejala ini akan terhapus. Apakah anda yakin?`}
      />
      <SectionLayout>
        <h3 className="text-base font-medium ">
          Kelola dan lihat data pengguna
        </h3>
        <div className="flex justify-between items-center mb-8 mt-4 md:flex-nowrap flex-wrap gap-4">
          <InputSearch placeholder="Cari Nama Pengguna dan Nama Lengkap..." />
          <div className="w-full md:w-fit flex justify-between items-center gap-2">
            <button
              disabled={Object.values(rowSelection).length === 0 || isPending}
              onClick={() => setIsDeleting(true)}
              className={`${
                Object.values(rowSelection).length > 0
                  ? "pointer-events-auto opacity-1"
                  : "pointer-events-none opacity-0"
              } w-8 h-8 border flex items-center justify-center rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-all ease-out duration-300`}
            >
              <Trash size={16} strokeWidth={1.5} className="" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="ml-auto text-sm">
                  Kolom
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize text-sm"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        {isLoading ? (
          <TableSkeleton table={table} column={20} py="py-4" />
        ) : (
          <>
            <TableFragment
              colSpan={Object.values(columns).length}
              table={table}
            />
            <TablePagination
              pagination={
                paging || { page: 1, limit: 10, total: 0, totalPage: 0 }
              }
              table={table}
            />
          </>
        )}
      </SectionLayout>
    </Fragment>
  );
}
