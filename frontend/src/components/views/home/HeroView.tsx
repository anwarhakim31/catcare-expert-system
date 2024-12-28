"use client";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";
import React from "react";
import { Inter } from "next/font/google";
import Image from "next/image";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const HeroView = () => {
  const { mutate, isPending } = usePostDiagnosis();

  return (
    <section className="w-full relative h-[600px]">
      <div className="relative md:h-[600px] py-40  flex justify-center z-10 items-center flex-col ">
        <h3
          style={inter.style}
          className="text-xl sm:text-3xl font-medium text-gray-900 tracking-wider px-4 "
        >
          Memperkenalkan{" "}
          <span className="text-orange-500 font-medium">Catcare.</span>
        </h3>
        <h1
          style={inter.style}
          className="text-3xl sm:text-5xl font-bold mt-3 text-center sm:max-w-[700px] 
         tracking-wider"
        >
          Sistem Pakar Diagnosis Penyakit Kulit Kucing
        </h1>

        <div className="my-8 h-0.5 w-full max-w-[400px] md:max-w-[600px] bg-gray-300"></div>
        <PushButton
          bgColor="bg-orange-500"
          shadowColor="shadow-orange-700"
          onClick={() => mutate()}
          loading={isPending}
        >
          <span className="w-full  text-white h-10 flex justify-center items-center z-1">
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
        className="absolute top-0 object-left object-cover left-0 h-full w-[21vw]   hidden md:block "
      />
      <Image
        src={"/right.jpg"}
        alt="right"
        width={500}
        height={500}
        priority
        className="absolute top-0 object-right object-cover right-0 h-full w-[21vw]  hidden md:block"
      />
    </section>
  );
};

export default HeroView;
