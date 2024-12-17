import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Paging } from "@/types/api";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const TablePagination = <T,>({
  pagination,
  table,
}: {
  pagination: Paging;
  table: Table<T>;
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <div className="flex flex-col items-center justify-between gap-2 space-x-2 pt-4 md:flex-row">
      <div className=" text-sm text-muted-foreground">
        {pagination?.total > 0 ? (
          <>
            Menampilkan{" "}
            {pagination.page * pagination.limit - pagination.limit + 1} -{" "}
            {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
            dari {pagination.total} data
          </>
        ) : (
          "Tidak ada data"
        )}
      </div>

      <div className="flex items-center gap-2">
        <p className="whitespace-nowrap text-sm font-medium">
          List per halaman
        </p>
        <Select
          value={`${pagination.limit}`}
          onValueChange={(value) => {
            table.setPageSize(Number(value));
            table.setPageIndex(0);
            const param = new URLSearchParams(searchParams);

            param.set("page", "1");
            param.set("limit", value);

            const url = `${pathname}?${param.toString()}`;
            router.replace(url);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={pagination.limit} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          aria-label="Go to first page"
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            table.setPageIndex(0);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeftIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to previous page"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.previousPage();
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
        <span>{table.getState().pagination.pageIndex + 1}</span>
        <Button
          aria-label="Go to next page"
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.nextPage();
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon className="h-4 w-4" aria-hidden="true" />
        </Button>
        <Button
          aria-label="Go to last page"
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            const nextPage = table.getPageCount() - 1;
            table.setPageIndex(nextPage);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
};

export default TablePagination;
