import { Disease } from "@/types/model";
import Image from "next/image";
import React from "react";

import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const PenyakitMainView = ({ data }: { data: Disease[] }) => {
  return (
    <main className="w-full min-h-[calc(100vh-92px)] container py-32">
      <h3 style={rubik.style} className="text-2xl text-center mb-20  ">
        <span className="bg-gradient-to-l from-white via-white to-orange-500 px-4 py-1 ">
          Daftar Penyakit
        </span>
      </h3>

      <div className="grid sm:grid-cols-4 md:grid-cols-12  gap-8">
        {data?.map((item: Disease) => (
          <div
            key={item.id}
            className=" sm:col-span-2 md:col-span-4 lg:col-span-3  border-orange-500 border-t-2 border-b-2 rounded-tr-md  rounded-tl-md  overflow-hidden"
          >
            <figure className="h-[175px]">
              <Image
                src={item?.image}
                alt={item.name}
                width={500}
                height={500}
                className="object-cover w-full h-full object-center"
              />
            </figure>
            <div className="px-4 py-6">
              <h1 className="text-base  font-medium capitalize">{item.name}</h1>
              <p className="line-clamp-5 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
};

export default PenyakitMainView;
