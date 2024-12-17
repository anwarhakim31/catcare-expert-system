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

const FormSchema = z.object({
  image: z.string().min(1, { message: "Gambar harus diisi" }),
  name: z.string().min(1, { message: "Nama harus diisi" }),
  description: z.string().min(1, { message: "Deskripsi harus diisi" }),
  solution: z.string().min(1, { message: "Solusi harus diisi" }),
});

const FormPenyakitView = ({ dataEdit }: { dataEdit: Disease }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
            name="name"
            render={({ field }) => (
              <DataFormControl
                field={field}
                type="text"
                label="Nama Penyakit"
                placeholder="Contoh: flu"
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
                placeholder="Deskripsi penyakit"
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
                placeholder="Solusi penyakit"
                label="Solution"
              />
            )}
          />
          <LoadingButton
            loading={pendingPost || pendingPut}
            aria-label="simpan"
            className="w-[150px] ml-auto flex items-center"
          >
            Simpan
          </LoadingButton>
        </form>
      </Form>
    </SectionLayout>
  );
};

export default FormPenyakitView;
