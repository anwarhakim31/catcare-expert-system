import Image from "next/image";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const InformationView = () => {
  return (
    <section className="pt-32 pb-32 container ">
      <h3
        style={inter.style}
        className=" text-xl md:text-2xl lg:text-3xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-bold"
      >
        Tentang Sistem
      </h3>
      <p className="text-center mb-14 text-gray-500 text-xs tracking-wider">
        Sistem Pakar Diagnosis Penyakit Kulit Kucing
      </p>
      <div className="flex items flex-wrap justify-center gap-2 flex-row-reverse  lg:flex-nowrap ">
        <figure className="aspect-video max-h-[500px] rounded-xl ">
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

        <p className="pt-8 lg:max-w-[400px] mx-auto leading-7 text-sm  text-gray-700">
          <span className="font-semibold">Sistem Pakar </span>
          adalah sebuah program komputer yang dirancang untuk meniru kemampuan
          seorang pakar dalam suatu bidang tertentu. Sistem ini menggunakan
          pengetahuan dan aturan yang telah dikumpulkan untuk memberikan{" "}
          <span className="font-semibold">
            solusi, rekomendasi, atau kesimpulan
          </span>{" "}
          terhadap suatu masalah yang biasanya membutuhkan keahlian manusia.
          Sistem pakar merupakan bagian dari kecerdasan buatan AI (
          <span className="font-semibold italic">Artificial Intelligence</span>)
          yang fokus pada pengolahan pengetahuan.
        </p>
      </div>
    </section>
  );
};

export default InformationView;
