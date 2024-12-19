"use client";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";
import React from "react";

const HeroView = () => {
  const { mutate, isPending } = usePostDiagnosis();

  return (
    <PushButton
      bgColor="bg-orange-500"
      shadowColor="shadow-orange-700"
      onClick={() => mutate()}
      loading={isPending}
    >
      <span className="w-full h-full text-white ">Diagnosis</span>
    </PushButton>
  );
};

export default HeroView;
