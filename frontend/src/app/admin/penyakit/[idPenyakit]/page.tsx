"use client";

import AreaFormControl from "@/components/fragments/AreaFormControl";
import BoxUploadImage from "@/components/fragments/BoxUploadImage";
import DataFormControl from "@/components/fragments/DataFormControl";

import { LoadingButton } from "@/components/ui/button-loading";
import { Form, FormField } from "@/components/ui/form";
import usePostDisease from "@/hooks/penyakit/usePostDisease";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  image: z.string().min(1, { message: "Nama pengguna harus diisi" }),
  name: z.string().min(1, { message: "Kata sandi harus diisi" }),
  description: z.string(),
  solution: z.string(),
});

const TambahPenyakitPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      image: "",
      name: "",
      description: "",
      solution: "",
    },
  });
  const { mutate, isPending } = usePostDisease();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data);
  };

  return (
    <section className="mx-4 my-8 p-6  border rounded-md">
      <h3 className=" mb-4 text-base font-medium ">Tambah Penyakit</h3>
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
            loading={isPending}
            aria-label="simpan"
            className="block ml-auto w-32"
          >
            Simpan
          </LoadingButton>
        </form>
      </Form>
    </section>
  );
};

export default TambahPenyakitPage;
