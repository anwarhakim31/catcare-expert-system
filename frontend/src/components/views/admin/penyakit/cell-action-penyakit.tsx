"use client";
import { Disease } from "@/types/model";
import React from "react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ModalDelete } from "@/components/fragments/modal-delete";
import useDeleteDisease from "@/hooks/penyakit/useDeleteDisease";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface CellActionProps {
  data: Disease;
}

const CellActionPenyakit: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const { mutate, isPending } = useDeleteDisease();

  const query = useQueryClient();

  const onConfirm = () => {
    mutate(
      { selected: [data.id as string] },
      {
        onSuccess: () => {
          setIsOpen(false);
          query.invalidateQueries({ queryKey: ["disease"] });
          toast.success("Berhasil menghapus penyakit" + data.name);
        },
        onError: (err) => {
          ResponseError(err);
        },
      }
    );
  };

  return (
    <>
      <ModalDelete
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Dengan menghapus  penyakit ini, semua data penyakit yang berkaitan dengan penyakit ini akan terhapus. Apakah anda yakin?`}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Aksi</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => router.push(`/admin/penyakit/${data.id}`)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setIsOpen(true)}
            className="cursor-pointer"
          >
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionPenyakit;
