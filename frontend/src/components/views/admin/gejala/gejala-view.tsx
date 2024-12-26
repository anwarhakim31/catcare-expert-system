import TableFragment from "@/components/fragments/Table";
import TablePagination from "@/components/fragments/TablePagination";
import TableSkeleton from "@/components/fragments/TableSkeleton";
import SectionLayout from "@/components/layouts/SectionLayout";
import { Button } from "@/components/ui/button";
import InputSearch from "@/components/ui/input-search";
import useDataTableSymptom from "@/hooks/gejala/useDataTableSymptom";
import { Paging } from "@/types/api";
import { Symptom } from "@/types/model";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";
import { Fragment, useState } from "react";
import { ModalFormGejala } from "./modal-form-gejala";
import { ModalDelete } from "@/components/fragments/modal-delete";
import useDeleteSymptom from "@/hooks/gejala/useDeleteSymptom";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  paging: Paging;
  isLoading: boolean;
}

export function GejalaView<TData extends Symptom, TValue>({
  columns,
  data,
  paging,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { rowSelection, table } = useDataTableSymptom({
    columns,
    data,
    paging,
  });

  const { mutate, isPending } = useDeleteSymptom();
  const query = useQueryClient();

  return (
    <Fragment>
      <ModalFormGejala open={isOpenForm} setOpen={() => setIsOpenForm(false)} />
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
                query.invalidateQueries({ queryKey: ["symptom"] });
                query.invalidateQueries({ queryKey: ["rules"] });
                setIsDeleting(false);
                table.resetRowSelection();
                toast.success("Berhasil menghapus gejala");
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
        <h3 className="text-base font-medium ">Kelola dan lihat data gejala</h3>
        <div className="flex justify-between items-center mb-8 mt-4 md:flex-nowrap flex-wrap gap-4">
          <InputSearch placeholder="Cari nama gejala..." />
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
