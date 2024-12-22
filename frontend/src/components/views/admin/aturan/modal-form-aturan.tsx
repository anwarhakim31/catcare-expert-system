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
import { LoadingButton } from "@/components/ui/button-loading";
import { Disease, Rule, Symptom } from "@/types/model";
import SelectFormControl from "@/components/fragments/select-form-control";
import useFetchSymptom from "@/hooks/gejala/useFetchSymptom";
import useGetDisease from "@/hooks/penyakit/useGetDisease";
import usePostRule from "@/hooks/aturan/usePostRule";
import usePutRules from "@/hooks/aturan/usePutRules";

export function ModalFromAturan({
  open,
  setOpen,
  dataEdit,
}: {
  open: boolean;
  setOpen: () => void;
  dataEdit?: Rule;
}) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-base">Tambah Aturan</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <AturanForm onClose={setOpen} dataEdit={dataEdit} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle className="text-base">Tambah Aturan</DialogTitle>
          <DialogDescription></DialogDescription>
        </DrawerHeader>
        <AturanForm className="px-4" onClose={setOpen} dataEdit={dataEdit} />
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
  diseaseId: z.string().min(1, {
    message: "Penyakit harus diisi",
  }),
  symptomId: z.string().min(1, {
    message: "Gejala harus diisi",
  }),
});

function AturanForm({
  className,
  onClose,
  dataEdit,
}: {
  className?: string;
  onClose: () => void;
  dataEdit?: Rule;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      diseaseId: dataEdit?.diseaseId || "",
      symptomId: dataEdit?.symptomId || "",
    },
  });

  const { mutate: Post, isPending: PostPending } = usePostRule(onClose);
  const { mutate: Put, isPending: PutPending } = usePutRules(
    dataEdit?.id || "",
    onClose
  );
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    if (dataEdit) {
      Put(values);
      onClose();
    } else {
      Post(values);
    }
  }

  const { data: dataSymptom, isLoading: isLoadingSymptom } = useFetchSymptom();
  const { data: dataDisease, isLoading: isLoadingDisease } = useGetDisease();

  return (
    <Form {...form}>
      <form
        className={cn("grid items-start gap-4", className)}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="diseaseId"
          render={({ field }) => (
            <SelectFormControl
              field={field}
              label="Penyakit"
              placeholder="Pilih Penyakit"
              isLoading={isLoadingDisease}
              data={dataDisease?.data?.map((item: Disease) => ({
                id: item.id,
                value: item.id,
              }))}
            />
          )}
        />
        <FormField
          control={form.control}
          name="symptomId"
          render={({ field }) => (
            <SelectFormControl
              field={field}
              label="Gejala"
              placeholder="Pilih Gejala"
              isLoading={isLoadingSymptom}
              data={dataSymptom?.data?.map((item: Symptom) => ({
                id: item.id,
                value: item.id,
              }))}
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
