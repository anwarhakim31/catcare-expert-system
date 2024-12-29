import ProfileFormControl from "@/components/fragments/profile-form-control";
import ProfilePhoto from "@/components/fragments/profile-photo";
import { Form, FormField } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { useAuthContext } from "@/context/AuthContext";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ProfileChangePassView from "../../profil/ProfileChangePassView";
import { ScrollArea } from "@/components/ui/scroll-area";
import useEditProfile from "@/hooks/user/useEditProfile";
import { toast } from "sonner";
import { ResponseError } from "@/lib/ResponseError";
import { LoadingButton } from "@/components/ui/button-loading";

const FormSchema = z.object({
  username: z.string().min(1, { message: "Nama pengguna harus diisi" }),
  fullname: z.string().min(1, { message: "Nama lengkap harus diisi" }),
  photo: z.string().optional(),
});

export function ProfileSheet() {
  const context = useAuthContext();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: context?.userData?.username || "",
      fullname: context?.userData?.fullname || "",
      photo: context?.userData?.photo || "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);
  const [isProfile, setIsProfile] = React.useState(false);
  const [isPassword, setIsPassword] = React.useState(false);

  const { mutate, isPending } = useEditProfile();

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Profil berhasil diubah");
        setIsProfile(false);

        context?.setUserData({ ...context?.userData, ...data });
      },
      onError: (err) => {
        return ResponseError(err);
      },
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <button className="text-sm w-full p-2 block hover:bg-orange-50 transition-all duration-200 ease-in-out text-left">
          Profile
        </button>
      </SheetTrigger>
      <SheetContent className="p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Profile</SheetTitle>
          <SheetDescription>
            Atur informasi profil Anda untuk mengontrol, melindungi, dan
            mengamankan akun Anda.{" "}
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] px-4 pb-8">
          <div className="mt-8 flex w-full justify-end items-center gap-2">
            <Label
              htmlFor="edit"
              className="text text-xs font-medium text-gray-500"
            >
              Edit Profil
            </Label>
            <Switch
              onCheckedChange={() => setIsProfile(!isProfile)}
              checked={isProfile}
              id="edit"
            />
          </div>
          <Form {...form}>
            <form
              className="space-y-4 mt-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ProfilePhoto
                form={form}
                isEdit={isProfile}
                setLoading={setLoading}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <ProfileFormControl
                    field={field}
                    label="Nama Pengguna"
                    type="text"
                    placeholder="Nama Pengguna"
                    isEdit={isProfile}
                  />
                )}
              />
              <FormField
                control={form.control}
                name="fullname"
                render={({ field }) => (
                  <ProfileFormControl
                    field={field}
                    label="Nama Lengkap"
                    type="text"
                    placeholder="Nama Lengkap"
                    isEdit={isProfile}
                  />
                )}
              />
              {isProfile && (
                <LoadingButton
                  type="submit"
                  className="w-full h-10 mt-6"
                  loading={isPending || loading}
                  disabled={isPending || loading}
                >
                  Simpan
                </LoadingButton>
              )}
            </form>
          </Form>

          <div className="mt-8 flex w-full justify-end items-center gap-2">
            <Label
              htmlFor="edit"
              className="text text-xs font-medium text-gray-500"
            >
              Ganti Password
            </Label>
            <Switch
              onCheckedChange={() => setIsPassword(!isPassword)}
              checked={isPassword}
              id="edit"
            />
          </div>
          {isPassword && (
            <ProfileChangePassView setIsPassword={setIsPassword} />
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
