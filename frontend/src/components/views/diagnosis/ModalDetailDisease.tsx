import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Disease } from "@/types/model";
import { Description } from "@radix-ui/react-dialog";
import { Eye } from "lucide-react";
import Image from "next/image";

export function ModalDetailDisease({ disease }: { disease: Disease }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button type="button" title="Detail Penyakit" className="no-print">
          <Eye width={18} strokeWidth={1.5} />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] space-y-0">
        <DialogHeader>
          <DialogTitle className="text-base">{disease?.name}</DialogTitle>
          <Description></Description>
        </DialogHeader>

        <figure
          id="radix-:r2:"
          aria-describedby="radix-:r3:"
          className="w-full h-[150px] flex justify-center items-center"
        >
          <Image
            src={disease?.image}
            alt={disease?.name}
            width={500}
            height={500}
            className="w-full h-full object-contain"
          />
        </figure>
        <p className="text-sm whitespace-pre-line max-h-[160px] overflow-auto scroll-hidden">
          {disease?.description}
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione alias
          illum suscipit quos eveniet optio amet ex maxime fugit magni, est,
          eius deserunt! Iure pariatur vitae repudiandae eaque harum explicabo!
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In odio
          reprehenderit neque harum. Unde, rem repellendus. Esse dignissimos et,
          natus aliquid asperiores incidunt delectus earum odio eius
          consequuntur soluta voluptatem?
        </p>
      </DialogContent>
    </Dialog>
  );
}
