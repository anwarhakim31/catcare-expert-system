import * as React from "react";

import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";

import DataFormControl from "@/components/fragments/DataFormControl";

import { LoadingButton } from "@/components/ui/button-loading";
import { User } from "@/types/model";
import usePutUser from "@/hooks/user/usePutUser";
import ProfilePhoto from "@/components/fragments/profile-photo";

export function ModalFormPengguna({
  open,
  setOpen,
  dataEdit,
}: {
  open: boolean;
  setOpen: () => void;
  dataEdit?: User;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base">
              {dataEdit ? "Edit" : "Tambah"} Pengguna
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <PenggunaForm onClose={setOpen} dataEdit={dataEdit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle className="text-base">
            {dataEdit ? "Edit" : "Tambah"} Pengguna
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DrawerHeader>
        <PenggunaForm className="px-4" onClose={setOpen} dataEdit={dataEdit} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const FormSchema = z.object({
  username: z.string().min(1, {
    message: "Nama panggilan harus diisi",
  }),
  fullname: z.string().min(1, {
    message: "Nama lengkap harus diisi",
  }),
  photo: z.string().optional(),
  password: z.string().optional(),
});

function PenggunaForm({
  className,
  onClose,
  dataEdit,
}: {
  className?: string;
  onClose: () => void;
  dataEdit?: User;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: dataEdit?.username || "",
      fullname: dataEdit?.fullname || "",
      photo: dataEdit?.photo || "",
      password: dataEdit?.password || "",
    },
  });
  const [loading, setLoading] = React.useState(false);

  const { mutate: Put, isPending: PutPending } = usePutUser(onClose);
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    Put(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <ProfilePhoto form={form} setLoading={setLoading} isEdit={true} />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <DataFormControl
              field={field}
              type="text"
              label="Nama Pengguna"
              placeholder="Masukkan Nama Pengguna"
            />
          )}
        />
        <FormField
          control={form.control}
          name="fullname"
          render={({ field }) => (
            <DataFormControl
              field={field}
              type="text"
              label="Nama Lengkap"
              placeholder="Masukkan Nama Lengkap"
            />
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <DataFormControl
              type="password"
              field={field}
              label="kata Sandi"
              placeholder="Masukkan Kata Sandi"
            />
          )}
        />
        <LoadingButton
          type="submit"
          loading={PutPending || loading}
          className="w-full mt-4"
        >
          Simpan
        </LoadingButton>
      </form>
    </Form>
  );
}
