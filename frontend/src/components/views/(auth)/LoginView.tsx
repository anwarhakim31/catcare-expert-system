import AuthFormControl from "@/components/fragments/AuthFormControl";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import RememberMe from "@/components/fragments/RememberMe";

const FormSchema = z.object({
  namaPengguna: z.string(),
  sandi: z.string(),
});

const LoginView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: localStorage.getItem("remember")
      ? JSON.parse(localStorage.getItem("remember")!)
      : {
          namaPengguna: "",
          sandi: "",
        },
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
          name="sandi"
          render={({ field }) => (
            <AuthFormControl type="password" field={field} label="Kata Sandi" />
          )}
        />
        <div className="flex items-center justify-between mt-8">
          <RememberMe form={form} />
          <Link
            href="/forget-password"
            className="text-xs text-orange-500 w-fit hover:text-orange-600 hover:underline "
          >
            Lupa Kata Sandi
          </Link>
        </div>
        <Button type="submit" aria-label="Masuk" className="w-full mt-4">
          Masuk
        </Button>
        <div className="flex items-center justify-center mt-4 gap-2">
          <p className="text-xs">Belum punya akun?</p>{" "}
          <Link
            href="/register"
            className="text-xs  block text-orange-500 w-fit hover:text-orange-600 hover:underline"
          >
            Daftar
          </Link>
        </div>
      </form>
    </Form>
  );
};

export default LoginView;
