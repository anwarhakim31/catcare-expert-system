"use client";
import AuthFormControl from "@/components/fragments/AuthFormControl";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { LoadingButton } from "@/components/ui/button-loading";
import useForget from "@/hooks/auth/useForget";
import { ResponseError } from "@/lib/ResponseError";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  username: z.string().min(1, { message: "Nama pengguna harus diisi" }),
  fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
  password: z
    .string()
    .min(5, { message: "Kata sandi Baru minimal 5 karakter" }),
});

const ForgetPasswordView = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: "", password: "", fullname: "" },
  });
  const router = useRouter();
  const { mutate } = useForget();
  const [isLoading, setIsLoading] = React.useState(false);

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: () => {
        form.reset();
        router.replace("/login");
        toast.success("Kata sandi berhasil diubah");
      },
      onError: (err) => {
        setIsLoading(false);
        return ResponseError(err);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <AuthFormControl type="text" field={field} label="Nama Pengguna" />
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <AuthFormControl type="text" field={field} label="Nama Lengkap" />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <AuthFormControl
              type="password"
              field={field}
              label="Kata Sandi Baru"
            />
          )}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          aria-label="Masuk"
          className="w-full mt-4"
        >
          Daftar
        </LoadingButton>
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
