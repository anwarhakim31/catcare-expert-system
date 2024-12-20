"use client";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";
import { AlarmClockOff } from "lucide-react";
import Link from "next/link";
import React from "react";

const DiagnosisExpiredView = () => {
  const { mutate, isPending } = usePostDiagnosis();
  return (
    <section className="relative z-1 w-full h-screen pt-[60px] md:pt-[80px] p-4  flex flex-col justify-center items-center">
      <div className="w-[100px] h-[100px] rounded-full bg-red-500 flex items-center justify-center">
        <AlarmClockOff size={50} strokeWidth={1.5} color="white" />
      </div>
      <h1 className="text-base font-medium text-gray-700 mt-4">
        Waktu Diagnosis Telah Habis
      </h1>
      <div className="flex gap-4 items-center mt-8">
        <PushButton
          loading={false}
          className="flex items-center border justify-center h-8 text-sm border-blue-700"
          shadowColor="shadow-blue-700"
          bgColor="white"
        >
          <Link href="/" className="" replace>
            Kembali
          </Link>
        </PushButton>
        <PushButton
          loading={isPending}
          className="flex items-center border justify-center h-8 text-sm border-orange-500"
          shadowColor="shadow-orange-500"
          bgColor="white"
          onClick={() => mutate()}
        >
          <span className="">Diagnosis</span>
        </PushButton>
      </div>
    </section>
  );
};

export default DiagnosisExpiredView;
