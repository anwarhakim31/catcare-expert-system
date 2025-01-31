import { Disease } from "@/types/model";

import React from "react";

import { Inter } from "next/font/google";
import ImageBlurDisease from "./ImageBlurDisease";
import { Badge } from "@/components/ui/badge";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const PenyakitMainView = ({ data }: { data: Disease[] }) => {
  return (
    <main className="w-full min-h-[calc(100vh-92px)] container py-32 overflow-hidden">
      <Badge
        variant="primary"
        className="capitalize flex items-center justify-center w-[100px] mx-auto mb-1"
      >
        Penyakit
      </Badge>
      <h3
        style={inter.style}
        className="text-3xl  text-gray-900 tracking-wider px-4 text-center font-semibold"
      >
        Daftar Penyakit
      </h3>
      <p className="text-gray-600 text-center text-sm mt-4 font-medium">
        Berikut adalah daftar penyakit kulit kucing yang ada di Catcare{" "}
      </p>

      <div className="grid sm:grid-cols-4 md:grid-cols-12 lg:grid-cols-9 xl:grid-cols-12  gap-8 mt-14">
        {data.length > 0 ? (
          data?.map((item: Disease) => (
            <div
              key={item.id}
              className=" sm:col-span-2 md:col-span-4 lg:col-span-3 shadow-md  rounded-md  overflow-hidden"
            >
              <figure className="aspect-video relative ">
                <ImageBlurDisease item={item} />
              </figure>
              <div className="px-4 py-6">
                <h1 className="text-base  font-medium capitalize">
                  {item.name}
                </h1>
                <p className="line-clamp-5 mt-2 text-sm text-gray-700">
                  {item.description}
                </p>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-12 h-full w-full mt-8 flex justify-center items-center">
            <p>Belum ada penyakit</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default PenyakitMainView;
