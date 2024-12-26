import ProfileFormControl from "@/components/fragments/profile-form-control";
import { LoadingButton } from "@/components/ui/button-loading";
import { Form, FormField } from "@/components/ui/form";
import useChangePassword from "@/hooks/user/useChangePassword";
import { ResponseError } from "@/lib/ResponseError";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z
  .object({
    password: z.string().min(1, {
      message: "Kata sandi lama harus diisi",
    }),
    newPassword: z.string().min(5, {
      message: "Kata sandi baru minimal 5 karakter",
    }),
    confPassword: z.string().min(1, {
      message: "Konfirmasi kata sandi harus diisi",
    }),
  })
  .refine((data) => data.newPassword === data.confPassword, {
    path: ["confPassword"],
    message: "Konfirmasi kata sandi harus sama dengan kata sandi baru",
  });

const ProfileChangePassView = ({
  setIsPassword,
}: {
  setIsPassword: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathaname = usePathname();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confPassword: "",
    },
  });

  const { mutate, isPending } = useChangePassword();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("Kata sandi berhasil diubah");
        setIsPassword(false);
      },
      onError: (err) => {
        return ResponseError(err);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1">
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="Kata Sandi Lama"
              placeholder="Masukkan kata sandi lama"
            />
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="Kata Sandi Baru"
              placeholder="Masukkan kata sandi Baru"
            />
          )}
        />
        <FormField
          control={form.control}
          name="confPassword"
          render={({ field }) => (
            <ProfileFormControl
              type="password"
              field={field}
              label="Konfirmasi Kata Sandi"
              placeholder="Masukkan kata sandi Baru"
            />
          )}
        />
        <LoadingButton
          loading={isPending}
          disabled={isPending}
          className={`${
            pathaname.startsWith("/admin/") ? "" : "md:w-[200px]   "
          } ml-auto text-sm h-10 mt-6 w-full `}
        >
          Simpan
        </LoadingButton>
      </form>
    </Form>
  );
};

export default ProfileChangePassView;
