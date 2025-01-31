"use client";
import React from "react";

import { Inter } from "next/font/google";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import MarqueView from "./marquee";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const TentangMainView = () => {
  const { mutate, isPending } = usePostDiagnosis();

  return (
    <main className="w-full min-h-[calc(100vh-92px)]  py-32 overflow-hidden">
      <Badge
        variant="primary"
        className="capitalize flex items-center justify-center w-[100px] mx-auto mb-1"
      >
        Tentang
      </Badge>
      <h3
        style={inter.style}
        className="text-3xl  text-gray-900 tracking-wider px-4 text-center font-semibold"
      >
        Tentang Catcare
      </h3>
      <p className="text-gray-600 text-center text-sm mt-4 font-medium">
        Sistem Pakar Diagnosis Penyakit Kulit Kucing
      </p>
      <section className="flex items-center justify-between container flex-wrap md:flex-nowrap">
        <Image
          src="/about.png"
          alt="owner"
          width={400}
          height={400}
          quality={100}
          priority
        />
        <div className="w-full max-w-[700px] ">
          <p className=" text-gray-700 text-sm mb-8  leading-7 ">
            <span className="font-semibold">
              Sistem Pakar Diagnosis Penyakit Kulit Kucing
            </span>{" "}
            adalah sebuah program komputer yang dirancang untuk meniru kemampuan
            seorang pakar dalam suatu bidang tertentu. Sistem pakar merupakan
            bagian dari kecerdasan buatan AI (
            <span className="font-semibold italic">
              Artificial Intelligence
            </span>{" "}
            ) yang fokus pada pengolahan pengetahuan. Sistem ini dapat membantu
            seorang pakar atau pemilik kucing dalam menentukan penyakit kulit
            kucing yang mungkin terjadi pada kucing. Metode yang digunakan dalam
            sistem ini adalah metode{" "}
            <span className="font-semibold italic">Forward Chaining</span>,
            dimana pengetahuan dan aturan yang telah dikumpulkan oleh pakar
            digunakan untuk membuat{" "}
            <span className="font-semibold">
              solusi, rekomendasi, atau kesimpulan
            </span>{" "}
            terhadap suatu masalah.
          </p>
          <PushButton
            bgColor="bg-orange-500"
            shadowColor="shadow-orange-700"
            onClick={() => mutate()}
            loading={isPending}
            className="w-[80px]"
          >
            <span className="  text-white h-10 w-[100px] flex !text-xs justify-center items-center z-1">
              Coba Sistem
            </span>
          </PushButton>
        </div>
      </section>
      <MarqueView />
    </main>
  );
};

export default TentangMainView;
