"use client";
import { Symptom } from "@/types/model";
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
import { ModalFormGejala } from "./modal-form-gejala";
import useDeleteSymptom from "@/hooks/gejala/useDeleteSymptom";

interface CellActionProps {
  data: Symptom;
}

const CellActionGejala: React.FC<CellActionProps> = ({ data }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { mutate, isPending } = useDeleteSymptom();

  const query = useQueryClient();

  const onConfirm = () => {
    mutate(
      { selected: [data.id as string] },
      {
        onSuccess: () => {
          setIsDeleting(false);
          query.invalidateQueries({ queryKey: ["symptom"] });
          query.invalidateQueries({ queryKey: ["rules"] });
          toast.success("Berhasil menghapus gejala " + data.id?.toUpperCase());
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
        isOpen={isDeleting}
        onClose={() => setIsDeleting(false)}
        onConfirm={onConfirm}
        loading={isPending}
        desc={`Dengan menghapus gejala ini, semua data gejala yang berkaitan dengan gejala ini akan terhapus. Apakah anda yakin?`}
      />
      <ModalFormGejala
        open={isEditing}
        setOpen={() => setIsEditing(false)}
        dataEdit={data}
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
            onClick={() => setIsEditing(true)}
            className="cursor-pointer"
          >
            Edit
          </DropdownMenuItem>
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

export default CellActionGejala;
