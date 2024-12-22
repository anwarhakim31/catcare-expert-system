"use client";
import React from "react";
import AreaFormControl from "@/components/fragments/AreaFormControl";
import BoxUploadImage from "@/components/fragments/BoxUploadImage";
import DataFormControl from "@/components/fragments/DataFormControl";

import { LoadingButton } from "@/components/ui/button-loading";
import { Form, FormField } from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import usePostDisease from "@/hooks/penyakit/usePostDisease";
import SectionLayout from "@/components/layouts/SectionLayout";
import { Disease } from "@/types/model";
import usePutDisease from "@/hooks/penyakit/usePutDisease";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  id: z.string().min(1, { message: "ID harus diisi" }),
  image: z.string().min(1, { message: "Gambar harus diisi" }),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
  solution: z.string().min(1, { message: "Solusi harus diisi" }),
});

const FormPenyakitView = ({ dataEdit }: { dataEdit: Disease }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: dataEdit?.id || "",
      image: dataEdit?.image || "",
      name: dataEdit?.name || "",
      description: dataEdit?.description || "",
      solution: dataEdit?.solution || "",
    },
  });
  const { mutate: post, isPending: pendingPost } = usePostDisease();
  const { mutate: put, isPending: pendingPut } = usePutDisease(
    dataEdit?.id as string
  );

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    if (dataEdit) {
      put(data);
    } else {
      post(data);
    }
  };

  return (
    <SectionLayout>
      <h3 className=" mb-4 text-base font-medium ">
        {dataEdit?.id ? "Edit" : "Tambah"} Penyakit
      </h3>
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <DataFormControl
                field={field}
                type="text"
                label="ID"
                placeholder="Masukkan ID "
                classname="placeholder:capitalize uppercase"
              />
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <DataFormControl
                field={field}
                type="text"
                label="Nama Penyakit"
                placeholder="Masukkan nama "
              />
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => <BoxUploadImage field={field} form={form} />}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <AreaFormControl
                field={field}
                placeholder="Masukkan deskripsi"
                label="Deskripsi"
              />
            )}
          />

          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <AreaFormControl
                field={field}
                placeholder="Masukkan solusi"
                label="Solution"
              />
            )}
          />
          <div className="flex items-center justify-end gap-2">
            <LoadingButton
              loading={pendingPost || pendingPut}
              aria-label="simpan"
              className="w-[150px]  flex items-center bg-white text-gray-700 hover:bg-gray-100 transition-all duration-300 ease-in-out border border-gray-400"
              type="button"
              onClick={() => router.push("/admin/penyakit")}
            >
              Batal
            </LoadingButton>
            <LoadingButton
              loading={pendingPost || pendingPut}
              aria-label="simpan"
              className="w-[150px]  flex items-center"
            >
              Simpan
            </LoadingButton>
          </div>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default FormPenyakitView;
