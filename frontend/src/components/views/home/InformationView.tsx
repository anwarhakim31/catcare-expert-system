import Image from "next/image";
import React from "react";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const InformationView = () => {
  return (
    <section className="pt-36 pb-30 container ">
      <h3 style={rubik.style} className="text-3xl text-center mb-8  ">
        <span className="bg-gradient-to-l from-white via-white to-orange-500 px-4 ">
          Tentang Sistem
        </span>
      </h3>
      <div className="flex items flex-wrap justify-center md:flex-nowrap ">
        <figure className="w-[500px] max-h-[500px] ">
          <Image
            src="/home/expert-system.webp"
            alt="expert-system"
            width={500}
            height={500}
            quality={100}
            priority
            className="w-full h-full object-cover"
          />
        </figure>

        <p className="pt-10 max-w-[400px] mx-auto leading-7 text-sm md:text-base ">
          <span className="font-semibold ">Sistem Pakar </span>
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
