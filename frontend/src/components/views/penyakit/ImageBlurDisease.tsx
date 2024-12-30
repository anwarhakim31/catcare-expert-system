import getBase64 from "@/lib/getLocalBase64";
import { Disease } from "@/types/model";
import Image from "next/image";
import React from "react";

const ImageBlurDisease = async ({ item }: { item: Disease }) => {
  const blurData = await getBase64(item?.image);

  return (
    <Image
      src={item?.image}
      alt={item.name}
      width={200}
      height={175}
      placeholder="blur"
      blurDataURL={blurData}
      priority
      className="object-cover w-full h-full object-center"
    />
  );
};

export default ImageBlurDisease;
