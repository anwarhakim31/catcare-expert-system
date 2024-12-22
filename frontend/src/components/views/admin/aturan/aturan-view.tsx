import TableFragment from "@/components/fragments/Table";
import TablePagination from "@/components/fragments/TablePagination";
import TableSkeleton from "@/components/fragments/TableSkeleton";
import SectionLayout from "@/components/layouts/SectionLayout";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import { Paging } from "@/types/api";
import { Rule } from "@/types/model";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Fragment, useState } from "react";
import { ModalDelete } from "@/components/fragments/modal-delete";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";
import { ModalFromAturan } from "./modal-form-aturan";
import useDataTableRules from "@/hooks/aturan/useDataTableRules";
import useDeleteRules from "@/hooks/aturan/useDeleteRules";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paging: Paging;
  isLoading: boolean;
}

export function AturanView<TData extends Rule, TValue>({
  columns,
  data,
  paging,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { rowSelection, table } = useDataTableRules({
    columns,
    data,
    paging,
  });

  const { mutate, isPending } = useDeleteRules();
  const query = useQueryClient();

  return (
    <Fragment>
      <ModalFromAturan open={isOpenForm} setOpen={() => setIsOpenForm(false)} />
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
                query.invalidateQueries({ queryKey: ["rules"] });
                setIsDeleting(false);
                table.resetRowSelection();
                toast.success("Berhasil menghapus aturan");
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
        } aturan ini, semua data aturan yang berkaitan dengan aturan ini akan terhapus. Apakah anda yakin?`}
      />
      <SectionLayout>
        <h3 className="text-base font-medium ">Kelola dan lihat aturan</h3>
        <div className="flex justify-between items-center mb-8 mt-4 md:flex-nowrap flex-wrap gap-4">
          <InputSearch placeholder="Cari penyakit dari aturan..." />
          <div className="w-full md:w-fit flex justify-between items-center gap-2">
            <button
              // disabled={Object.values(rowSelection).length === 0 || isPending}
              onClick={() => setIsDeleting(true)}
              className={`${
                Object.values(rowSelection).length > 0
                  ? "pointer-events-auto opacity-1"
                  : "pointer-events-none opacity-0"
              } w-8 h-8 border flex items-center justify-center rounded-md text-red-500 hover:bg-red-500 hover:text-white transition-all ease-out duration-300`}
            >
              <Trash size={16} strokeWidth={1.5} className="" />
            </button>

            <Button className="w-[150px]" onClick={() => setIsOpenForm(true)}>
              Tambah
            </Button>
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
