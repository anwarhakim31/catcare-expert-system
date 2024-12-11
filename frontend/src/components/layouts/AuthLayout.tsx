"use client";
import Image from "next/image";
import React from "react";
import LoginView from "../views/(auth)/LoginView";

const AuthLayout = () => {
  return (
    <div className="w-screen h-screen bg-orange-300 flex justify-center items-center">
      <div className="w-full max-w-[550px] bg-white  rounded-md shadow-m  overflow-hidden">
        <div className="flex  justify-between">
          <div className="p-8 flex-1">
            <div className=" mb-8">
              <h1 className="text-lg font-semibold">Selamat Datang</h1>
              <p className="text-sm text-gray-700">
                Silahkan masuk untuk melanjutkan
              </p>
            </div>
            <LoginView />
          </div>
          <figure className="w-[225px]">
            <Image
              src={"/DSC00950.jpeg"}
              alt="DSC00950"
              width={400}
              height={300}
              className="object-cover w-full h-full"
              priority
            />
          </figure>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
