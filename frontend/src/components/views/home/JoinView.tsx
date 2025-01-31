"use client";
import PushButton from "@/components/ui/push-button";
import { useRouter } from "next/navigation";
import React from "react";

const JoinView = () => {
  const router = useRouter();

  return (
    <div className="relative  w-full aspect-[2/1] max-h-[400px] overflow-hidden  bg-[url('/tentang.jpg')] mt-28  bg-[position:center_-100px] lg:bg-[position:center_-300px] bg-no-repeat bg-cover ">
      <div className="absolute inset-0 z- bg-black/60"></div>
      <div className=" container flex items-center justify-center flex-col h-full">
        <h1 className="relative z-10 text-center text-orange-500 font-semibold text-lg md:text-2xl lg:text-3xl ">
          Jangan Menunda Penanganan Penyakit Kulit Kucing Anda.
        </h1>
        <p className="relative z-10 text-center text-sm md:text-base text-white">
          Daftar dan Lakukan Diagnosis Penyakit Kulit Kucing Anda Sekarang{" "}
        </p>
        <PushButton
          loading={false}
          onClick={() => router.push("/register")}
          className="relative z-10 mt-4 md:mt-8  flex items-center justify-center h-8 md:h-10 "
        >
          <span className="text-white text-xs md:!text-sm">
            Daftar Sekarang
          </span>
        </PushButton>
      </div>
    </div>
  );
};

export default JoinView;
