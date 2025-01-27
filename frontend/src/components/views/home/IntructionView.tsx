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
    <section className="pt-36 pb-30 container ">
      <h3
        style={inter.style}
        className="text-xl md:text-2xl lg:text-3xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-bold"
      >
        Intruksi Penggunaan
      </h3>
      <p className="text-center mb-14 text-gray-500 text-xs tracking-wider">
        Intruksi penggunaan dalam menggunakan aplikasi Catcare.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3  gap-4 ">
        {data.map((item) => (
          <div
            key={item.id}
            className="flex justify-center items-center flex-col p-4"
          >
            <Image
              src={item.image}
              alt={`intruction-${item.id}`}
              width={250}
              height={250}
              quality={100}
              priority
              className=" lg:w-[250px] lg:h-[250px] w-[200px] h-[200px] object-cover"
            />
            <p className="text-center text-sm md:text-base mt-4">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntructionView;
