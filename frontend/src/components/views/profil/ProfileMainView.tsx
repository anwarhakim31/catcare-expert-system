"use client";

import ProfileFormControl from "@/components/fragments/profile-form-control";
import ProfilePhoto from "@/components/fragments/profile-photo";
import ProfileLayout from "@/components/layouts/ProfileLayout";
import { LoadingButton } from "@/components/ui/button-loading";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuthContext } from "@/context/AuthContext";
import useEditProfile from "@/hooks/user/useEditProfile";
import { ResponseError } from "@/lib/ResponseError";

import { zodResolver } from "@hookform/resolvers/zod";

import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import ProfileChangePassView from "./ProfileChangePassView";

const formSchema = z.object({
  username: z.string().min(1, { message: "Nama pengguna harus diisi" }),
  fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
  photo: z.string().optional(),
});

const AkunMainView = () => {
  const context = useAuthContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: context?.userData?.username || "",
      fullname: context?.userData?.fullname || "",
      photo: context?.userData?.photo || "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const { mutate, isPending } = useEditProfile();

  const handleSubmit = (data: z.infer<typeof formSchema>) => {
    mutate(data, {
      onSuccess: (user) => {
        context?.setUserData(user);
        setIsEdit(false);
        toast.success("Berhasil mengubah profil");
      },
      onError: (err) => {
        return ResponseError(err);
      },
    });
  };

  return (
    <ProfileLayout>
      <h1 className="text text-base font-medium tracking-wider">Profil</h1>
      <h3 className="text text-xs text-gray-500">
        Atur informasi profil Anda untuk mengontrol, melindungi, dan mengamankan
        akun Anda.
      </h3>
      <div className="mt-8 flex w-full justify-end items-center gap-2">
        <Label
          htmlFor="edit"
          className="text text-xs font-medium text-gray-500"
        >
          Edit Profil
        </Label>
        <Switch
          onCheckedChange={() => setIsEdit(!isEdit)}
          checked={isEdit}
          id="edit"
        />
      </div>

      <div className="flex justify-center mt-4 gap-8 flex-col lg:flex-row">
        <div className=" lg:w-[35%]">
          <ProfilePhoto form={form} isEdit={isEdit} setLoading={setLoading} />
        </div>
        <Form {...form}>
          <form className="flex-1" onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <ProfileFormControl
                  type="text"
                  field={field}
                  label="Nama Panggilan"
                  placeholder="Masukkan nama panggilan"
                  isEdit={isEdit}
                />
              )}
            />
            <FormField
              control={form.control}
              name="fullname"
              render={({ field }) => (
                <ProfileFormControl
                  type="text"
                  field={field}
                  label="Nama Lengkap"
                  placeholder="Masukkan nama lengkap"
                  isEdit={isEdit}
                />
              )}
            />
            {isEdit && (
              <LoadingButton
                loading={loading || isPending}
                disabled={loading || !isEdit || isPending}
                className="ml-auto text-sm h-10 mt-6 w-full md:w-[200px] "
              >
                Simpan
              </LoadingButton>
            )}
          </form>
        </Form>
      </div>
      <div className="mt-8 flex w-full justify-end items-center gap-2">
        <Label
          htmlFor="password"
          className="text text-xs font-medium text-gray-500"
        >
          Ganti Password
        </Label>
        <Switch
          onCheckedChange={() => setIsPassword(!isPassword)}
          checked={isPassword}
          id="password"
        />
      </div>
      <div className="flex mt-4 gap-8 flex-col lg:flex-row">
        <div className=" lg:w-[35%]"></div>
        {isPassword && <ProfileChangePassView setIsPassword={setIsPassword} />}
      </div>
    </ProfileLayout>
  );
};

export default AkunMainView;
