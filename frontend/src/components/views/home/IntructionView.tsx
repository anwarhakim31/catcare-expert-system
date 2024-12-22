import Image from "next/image";
import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({
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
      <h3 style={rubik.style} className="text-2xl text-center mb-14  ">
        <span className="bg-gradient-to-l from-white via-white to-orange-500 px-4 py-1 ">
          Intruksi Penggunaan
        </span>
      </h3>
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
            />
            <p className="text-center">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default IntructionView;
