"use client";
import AuthFormControl from "@/components/fragments/AuthFormControl";
import { Form, FormField } from "@/components/ui/form";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import RememberMe from "@/components/fragments/RememberMe";
import { ResponseError } from "@/lib/ResponseError";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@/components/ui/button-loading";

import { useAuthContext } from "@/context/AuthContext";
import useLogin from "@/hooks/auth/useLogin";

const FormSchema = z.object({
  username: z.string().min(1, { message: "Nama pengguna harus diisi" }),
  password: z.string().min(1, { message: "Kata sandi harus diisi" }),
});

const LoginView = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { username: "", password: "" },
  });
  const context = useAuthContext();
  const { mutate, isPending } = useLogin();
  const searchParams = useSearchParams().get("callbackUrl");

  const onSumbit = (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: (value) => {
        context?.setUserData(value.data);
        const redirectUrl = value.data.isAdmin
          ? searchParams || "/admin/dashboard"
          : searchParams || "/";

        router.replace(redirectUrl);

        form.reset();
      },
      onError: (err) => {
        return ResponseError(err);
      },
    });
  };

  useEffect(() => {
    if (localStorage.getItem("remember")) {
      const remember = JSON.parse(localStorage.getItem("remember")!);
      form.setValue("username", remember.username);
      form.setValue("password", remember.password);
    }
  }, [form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSumbit)}>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <AuthFormControl
              type="text"
              field={{
                ...field,
                onChange: (e) => {
                  field.onChange(e.target.value);
                  localStorage.setItem(
                    "remember",
                    JSON.stringify({
                      username: e.target.value,
                      password: form.getValues("password"),
                    })
                  );
                },
              }}
              label="Nama Pengguna"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <AuthFormControl
              type="password"
              field={{
                ...field,
                onChange: (e) => {
                  field.onChange(e.target.value);
                  localStorage.setItem(
                    "remember",
                    JSON.stringify({
                      username: form.getValues("username"),
                      password: e.target.value,
                    })
                  );
                },
              }}
              label="Kata Sandi"
            />
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
        <LoadingButton
          loading={isPending}
          type="submit"
          aria-label="Masuk"
          className="w-full mt-4"
        >
          Masuk
        </LoadingButton>
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
