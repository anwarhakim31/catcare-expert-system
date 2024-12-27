"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

const ErrorPage = () => {
  const router = useRouter();

  return (
    <div className="h-screen w-full  flex justify-center items-center flex-col">
      <h1 className="text-9xl font-bold bg-gradient-to-t from-orange-400 mb-2 via-orange-500 to-orange-700 bg-clip-text text-transparent">
        500
      </h1>
      <p className="text-2xl font-semibold text-orange-500">
        Terjadi Kesalahan Sistem
      </p>
      <Button onClick={() => router.back()} className="btn mt-4">
        Kembali
      </Button>
    </div>
  );
};

export default ErrorPage;
