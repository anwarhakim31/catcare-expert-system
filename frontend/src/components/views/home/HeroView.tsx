"use client";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";
import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const HeroView = () => {
  const { mutate, isPending } = usePostDiagnosis();

  return (
    <section className="w-full h-[600px] relative ">
      <div className=" h-[600px] py-40 container flex justify-center z-10 items-center flex-col ">
        <h3
          style={inter.style}
          className="text-xl sm:text-3xl font-medium text-gray-900 text-center tracking-wider px-4 "
        >
          Memperkenalkan{" "}
          <span className="text-orange-500 font-medium">Catcare.</span>
        </h3>
        <h1
          style={inter.style}
          className=" text-2xl md:text-3xl lg:text-5xl font-bold mt-3 text-center sm:max-w-[700px] 
         tracking-wider"
        >
          Sistem Pakar Diagnosis Penyakit Kulit Kucing
        </h1>

        <Separator className="max-w-[400px] md:max-w-[600px] my-4" />

        <h4 className="text-sm md:text-base text-gray-600 text-center mb-10">
          Diagnosis Untuk Mendapatkan Solusi Penanganan Dan Penyebab Penyakit{" "}
        </h4>
        <PushButton
          bgColor="bg-orange-500"
          shadowColor="shadow-orange-700"
          onClick={() => mutate()}
          loading={isPending}
        >
          <span className="w-full  text-white h-12 flex justify-center items-center z-1">
            Diagnosis
          </span>
        </PushButton>
      </div>
      <Image
        src={"/left.jpg"}
        alt="left"
        width={500}
        height={500}
        priority
        className="absolute -z-[1] top-0 object-left object-cover left-0 h-full w-[21vw]   hidden lg:block "
      />
      <Image
        src={"/right.jpg"}
        alt="right"
        width={500}
        height={500}
        priority
        className="absolute -z-[1] top-0 object-right object-cover right-0 h-full w-[21vw]  hidden lg:block"
      />
    </section>
  );
};

export default HeroView;
