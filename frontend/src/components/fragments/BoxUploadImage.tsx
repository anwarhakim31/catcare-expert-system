import { CloudUpload, X } from "lucide-react";
import React, { useState } from "react";

import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import usePostImage from "@/hooks/image/usePostImage";
import { UseFormReturn } from "react-hook-form";
import { ResponseError } from "@/lib/ResponseError";
import Image from "next/image";
import { formatImageName } from "@/utils/helpers";
import { Progress } from "../ui/progress";

interface FormValues {
  image: string;
  name: string;
  description: string;
  solution: string;
}

const BoxUploadImage = ({
  field,
  form,
}: {
  field: React.ComponentProps<typeof Input>;
  form: UseFormReturn<FormValues>;
}) => {
  const ref = React.useRef<HTMLInputElement>(null);
  const [proggress, setProggress] = useState(0);
  const [onDrag, setOnDrag] = useState(false);
  const { mutate, isPending } = usePostImage((value) => setProggress(value));

  const handleClick = () => {
    if (ref.current) {
      ref?.current.click();
    }
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      mutate(file, {
        onSuccess: (value) => {
          form.setValue("image", value.url);
          e.target.value = "";
          setProggress(0);
        },
        onError: (err) => {
          ResponseError(err);
        },
      });
    }
  };
  const handleDropImage = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) {
      mutate(file, {
        onSuccess: (value) => {
          form.setValue("image", value.url);
          e.dataTransfer.clearData();
          setProggress(0);
        },
        onError: (err) => {
          ResponseError(err);
        },
      });
    }
  };

  return (
    <FormItem>
      <FormLabel className=" text-gray-700">Gambar</FormLabel>
      <div
        onClick={() => (field.value ? {} : isPending ? {} : handleClick())}
        onDragOver={(e) => e.preventDefault()}
        onDragEnter={(e) => {
          e.preventDefault();
          setOnDrag(true);
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          setOnDrag(false);
        }}
        onDrop={handleDropImage}
        className={`${onDrag && "bg-orange-50"} ${
          field.value ? "" : "cursor-pointer"
        } hover:bg-orange-50 border h-[200px] mt-2 rounded-md  border-dashed border-gray-300 flex items-center justify-center flex-col`}
      >
        {!field.value && proggress === 0 && (
          <>
            <CloudUpload size={40} strokeWidth={1.5} />
            <span className="text-sm mt-4">
              Klik untuk pilih gambar, atau tarik ke sini{" "}
            </span>
            <span className="text-xs text-gray-500">
              Maksimal ukuran gambar 4mb
            </span>
          </>
        )}
        {proggress > 0 && (
          <div className="flex items-center gap-2 w-full justify-center">
            <Progress value={proggress} className="w-1/3" />{" "}
            <span className="text-sm">{proggress}%</span>
          </div>
        )}
        {field.value && (
          <>
            <figure className=" max-h-[120px] ">
              <Image
                src={(field.value as string) || ""}
                alt="image"
                width={200}
                height={200}
                loading="lazy"
                className="w-full h-full object-contain"
              />
            </figure>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-sm ">
                {formatImageName(field.value as string)}
              </span>
              <button
                aria-label="hapus gambar"
                type="button"
                onClick={() => form.setValue("image", "")}
              >
                <X size={16} />
              </button>
            </div>
          </>
        )}

        <FormControl>
          <Input
            ref={ref}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleChangeImage}
          />
        </FormControl>
      </div>
      <FormMessage />
    </FormItem>
  );
};

export default BoxUploadImage;
