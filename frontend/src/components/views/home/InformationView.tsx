import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const InformationView = () => {
  return (
    <section className="pt-36 pb-30 container ">
      <h3
        style={inter.style}
        className=" text-xl md:text-2xl lg:text-3xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-bold"
      >
        Tentang Sistem
      </h3>
      <p className="text-center mb-14 text-gray-500 text-xs tracking-wider">
        Sistem Pakar Diagnosis Penyakit Kulit Kucing
      </p>
      <div className="flex items flex-wrap justify-center md:flex-nowrap ">
        <figure className="w-[500px]  max-h-[500px] ">
          <Image
            src="/home/expert-system.png"
            alt="expert-system"
            width={500}
            height={500}
            quality={100}
            priority
            className="w-full h-auto object-cover"
          />
        </figure>

        <p className="pt-8 max-w-[400px] mx-auto leading-7 text-sm md:text-base text-gray-700">
          <span className="font-semibold text-gr">Sistem Pakar </span>
          adalah sebuah program komputer yang dirancang untuk meniru kemampuan
          seorang pakar dalam suatu bidang tertentu. Sistem ini menggunakan
          pengetahuan dan aturan yang telah dikumpulkan untuk memberikan solusi,
          rekomendasi, atau kesimpulan terhadap suatu masalah yang biasanya
          membutuhkan keahlian manusia. Sistem pakar merupakan bagian dari
          kecerdasan buatan (Artificial Intelligence, AI) yang fokus pada
          pengolahan pengetahuan.
        </p>
      </div>
    </section>
  );
};

export default InformationView;
