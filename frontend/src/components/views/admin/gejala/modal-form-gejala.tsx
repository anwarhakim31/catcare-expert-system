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
import AreaFormControl from "@/components/fragments/AreaFormControl";
import { LoadingButton } from "@/components/ui/button-loading";
import usePostSymptom from "@/hooks/gejala/usePostSymptom";
import { Symptom } from "@/types/model";
import usePutSymptom from "@/hooks/gejala/usePutSymptom";

export function ModalFormGejala({
  open,
  setOpen,
  dataEdit,
}: {
  open: boolean;
  setOpen: () => void;
  dataEdit?: Symptom;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base">
              {dataEdit ? "Edit" : "Tambah"} Gejala
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <GejalaForm onClose={setOpen} dataEdit={dataEdit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle className="text-base">
            {dataEdit ? "Edit" : "Tambah"} Gejala
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DrawerHeader>
        <GejalaForm className="px-4" onClose={setOpen} dataEdit={dataEdit} />
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
  id: z.string().min(1, {
    message: "Id harus diisi",
  }),
  symptom: z.string().min(1, {
    message: "Gejala harus diisi",
  }),
});

function GejalaForm({
  className,
  onClose,
  dataEdit,
}: {
  className?: string;
  onClose: () => void;
  dataEdit?: Symptom;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: dataEdit?.id || "",
      symptom: dataEdit?.symptom || "",
    },
  });

  const { mutate: Post, isPending: PostPending } = usePostSymptom(onClose);
  const { mutate: Put, isPending: PutPending } = usePutSymptom(
    dataEdit?.id || "",
    onClose
  );
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (dataEdit) {
      Put(values);
    } else {
      Post(values);
    }
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="id"
          render={({ field }) => (
            <DataFormControl
              field={field}
              type="text"
              label="ID"
              placeholder="Masukkan ID"
              classname="uppercase placeholder:capitalize"
            />
          )}
        />
        <FormField
          control={form.control}
          name="symptom"
          render={({ field }) => (
            <AreaFormControl
              field={field}
              label="Gejala"
              placeholder="Masukkan Gejala"
            />
          )}
        />
        <LoadingButton
          type="submit"
          loading={PostPending || PutPending}
          className="w-full mt-4"
        >
          Simpan
        </LoadingButton>
      </form>
    </Form>
  );
}
