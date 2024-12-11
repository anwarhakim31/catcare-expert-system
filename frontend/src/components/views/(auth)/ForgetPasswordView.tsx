"use client";
import AuthFormControl from "@/components/fragments/AuthFormControl";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  namaPengguna: z.string(),
  namaLengkap: z.string(),
  sandi: z.string(),
});

const ForgetPasswordView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { namaPengguna: "", sandi: "" },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="namaPengguna"
          render={({ field }) => (
            <AuthFormControl type="text" field={field} label="Nama Pengguna" />
          )}
        />
        <FormField
          control={form.control}
          name="namaLengkap"
          render={({ field }) => (
            <AuthFormControl type="text" field={field} label="Nama Lengkap" />
          )}
        />
        <FormField
          control={form.control}
          name="sandi"
          render={({ field }) => (
            <AuthFormControl type="password" field={field} label="Kata Sandi" />
          )}
        />

        <Button type="submit" aria-label="Masuk" className="w-full mt-4">
          Daftar
        </Button>
        <div className="flex items-center justify-center mt-4 gap-2">
          <p className="text-xs">Sudah punya akun?</p>{" "}
          <Link
            href="/login"
            className="text-xs  block text-orange-500 w-fit hover:text-orange-600 hover:underline"
          >
            Masuk
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default ForgetPasswordView;
