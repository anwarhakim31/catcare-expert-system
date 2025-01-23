"use client";
import AuthFormControl from "@/components/fragments/AuthFormControl";
import { Form, FormField } from "@/components/ui/form";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import { ResponseError } from "@/lib/ResponseError";
import { useRouter } from "next/navigation";

import { LoadingButton } from "@/components/ui/button-loading";
import useRegister from "@/hooks/auth/useRegister";
import { useAuthContext } from "@/context/AuthContext";
import { AxiosError } from "axios";

const FormSchema = z
  .object({
    username: z
      .string()
      .min(5, { message: "Nama pengguna minimal 5 karakter" }),
    fullname: z.string().min(5, { message: "Nama lengkap minimal 5 karakter" }),
    password: z.string().min(5, { message: "Kata sandi minimal 5 karakter" }),
  })
  .refine((data) => data.username !== data.password, {
    path: ["password"],
    message: "Kata sandi tidak boleh sama dengan nama pengguna",
  })
  .refine((data) => data.username !== data.fullname, {
    path: ["fullname"],
    message: "Nama lengkap tidak boleh sama dengan nama pengguna",
  });

const RegisterView = () => {
  const context = useAuthContext();
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: "", password: "", fullname: "" },
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const { mutate } = useRegister();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    mutate(data, {
      onSuccess: (user) => {
        document.cookie = `catcare=${
          user.data.token
        }; sameSite=none; path=/; max-age=${60 * 60 * 8}; secure`;
        form.reset();
        router.replace("/");
        context?.setUserData(user.data);
      },
      onError: (err) => {
        setIsLoading(false);
        if (err instanceof AxiosError && err?.response?.data.code === 400) {
          return form.setError("username", {
            message: err?.response?.data.message,
          });
        } else {
          return ResponseError(err);
        }
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
            <AuthFormControl type="password" field={field} label="Kata Sandi" />
          )}
        />

        <LoadingButton
          loading={isLoading}
          type="submit"
          aria-label="Masuk"
          className="w-full mt-8 "
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

export default RegisterView;
