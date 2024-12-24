"use client";
import { Diagnosis } from "@/types/model";
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

import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";

import { useQueryClient } from "@tanstack/react-query";

import useDeleteDiagnosis from "@/hooks/diagnosis/useDeleteDiagnosis";

interface CellActionProps {
  data: Diagnosis;
}

const CellActionDiagnosis: React.FC<CellActionProps> = ({ data }) => {
  // const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { mutate, isPending } = useDeleteDiagnosis();

  const query = useQueryClient();

  const onConfirm = () => {
    mutate(
      { selected: [data.id as string] },
      {
        onSuccess: () => {
          setIsDeleting(false);
          query.invalidateQueries({ queryKey: ["diagnosis"] });
          toast.success("Berhasil menghapus diagnosis");
        },
        onError: (err: Error) => {
          ResponseError(err);
        },
      }
    );
  };

  return (
    <>
      <ModalDelete
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Apakah anda yakin menghapus diagnosis?`}
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
            onClick={() => setIsDeleting(true)}
            className="cursor-pointer"
          >
            Hapus
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default CellActionDiagnosis;
