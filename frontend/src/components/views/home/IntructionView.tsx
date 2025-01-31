import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const data = [
  {
    id: 1,
    image: "/home/owner.png",
    text: "Pemilik kucing mengetahui gejala penyakit kulit kucing terlebih dahulu.",
  },
  {
    id: 2,
    image: "/home/diagnosis.png",
    text: "Pemilik kucing melakukan diagnosis bedasarkan gejala yang didapatkan.",
  },
  {
    id: 3,
    image: "/home/doctor.png",
    text: "Pemilik kucing membawakan kucing ke dokter untuk melakukan pemeriksaan lebih lanjut.",
  },
];

const IntructionView = () => {
  return (
    <section className="pt-28 pb-30 container ">
      <h3
        style={inter.style}
        className="text-xl md:text-2xl lg:text-3xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-bold"
      >
        Intruksi Penggunaan
      </h3>
      <p className="text-center mb-14 text-gray-500 text-xs tracking-wider">
        Intruksi penggunaan dalam menggunakan aplikasi Catcare.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3  gap-4 ">
        {data.map((item) => (
          <div
            key={item.id}
            className="rounded-lg p-2.5 border border-orange-300 border-dashed hover:border-solid hover:border-orange-500 flex flex-col h-full"
          >
            <div className="flex gap-2 items-center">
              <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center relative">
                <p className="text-white">{item.id}</p>
              </div>
              <h1 className="text-sm md:text-base font-semibold">
                Langkah {item.id}
              </h1>
            </div>
            <div className="text-gray-700 text-sm mt-4 flex-grow">
              <p>{item.text}</p>
            </div>
            <div className="mt-6">
              <Image
                src={item.image}
                alt={`intruction-${item.id}`}
                width={250}
                height={250}
                quality={100}
                priority
                className="mx-auto lg:w-[150px] lg:h-[150px] w-[100px] h-[100px] object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntructionView;
