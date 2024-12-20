"use client";
import CountdownFragment from "@/components/fragments/countdown";
import PushButton from "@/components/ui/push-button";

import usePatchDiagnosis from "@/hooks/diagnosis/usePatchDiagnosis";
import { ResponseError } from "@/lib/ResponseError";
import { Diagnosis, Symptom } from "@/types/model";

import { Check, CircleHelp, X } from "lucide-react";
import { useRouter } from "next/navigation";

import React from "react";

const DiagnosisPendingView = ({
  diagnosis,
  symptoms,
}: {
  diagnosis: Diagnosis;
  symptoms: Symptom[];
}) => {
  const router = useRouter();
  const [answer, setAnswer] = React.useState(diagnosis.symptoms || []);
  const [index, setIndex] = React.useState(diagnosis.symptoms?.length || 0);

  const { mutate, isPending } = usePatchDiagnosis(diagnosis);

  const handleAnswer = (status: boolean) => {
    const clonse = [...answer];
    clonse.push({
      id: symptoms[index].id,
      symptom: symptoms[index].symptom,
      answer: status,
    });

    setAnswer(clonse);

    if (index < symptoms.length - 1) {
      const answerData = {
        ...diagnosis,
        symptoms: clonse,
      };
      setIndex(index + 1);
      mutate(answerData);
    } else {
      const answerData = {
        ...diagnosis,
        symptoms: clonse,
        status: "finish",
      };
      mutate(answerData, {
        onSuccess: () => {
          router.refresh();
        },
        onError: (err) => {
          ResponseError(err);
        },
      });
    }
  };

  return (
    <section className="relative z-1 w-full h-screen pt-[60px] md:pt-[80px] p-4  flex flex-col justify-between]">
      <div className="w-full h-[50px] md:container flex justify-between items-center">
        <p className="font-medium text-base tracking-wider">
          Gejala ({index + 1}/{symptoms.length})
        </p>
        <CountdownFragment diagnosis={diagnosis} />
      </div>
      <div className="flex justify-center items-center flex-col  h-[calc(100vh-140px)]">
        <div className="relative h-[200px] w-full max-w-[400px] md:max-w-[600px]">
          <div className="bg-white  z-[1] w-full h-full flex justify-center items-center shadow-md border border-gray-300 scroll-hidden  rounded-md overflow-auto">
            <p className="text-gray-800 md:text-base whitespace-pre-line">
              {symptoms[index].symptom}
            </p>
          </div>
          <div className="absolute -top-6 left-1/2 -translate-x-1/2  text-white w-12 h-12 rounded-full flex items-center justify-center bg-orange-400">
            <CircleHelp size={32} strokeWidth={1.5} />
          </div>
        </div>
        <div className="w-full flex items-center gap-4 mt-10 justify-center flex-col-reverse sm:flex-row">
          <PushButton
            loading={isPending}
            bgColor="bg-white"
            className="text-black max-w-[250px] w-full  border border-red-500 "
            shadowColor="shadow-red-600"
            onClick={() => handleAnswer(false)}
          >
            <div className="flex items-center w-full justify-center gap-8 relative overflow-hidden h-8 text-sm">
              <span>Tidak</span>
              <div className=" bg-red-500 absolute right-4 top-1/2 rounded-full -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <X size={18} className="text-white" />
              </div>
            </div>
          </PushButton>
          <PushButton
            loading={isPending}
            bgColor="bg-white"
            className="text-black max-w-[250px] w-full  border border-green-500 "
            shadowColor="shadow-green-500"
            onClick={() => handleAnswer(true)}
          >
            <div className="flex items-center w-full justify-center gap-8 relative h-8 text-sm overflow-hidden">
              <span>Ya</span>
              <div className=" bg-green-500 absolute right-4 top-1/2 rounded-full -translate-y-1/2 w-6 h-6 flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
            </div>
          </PushButton>
        </div>
      </div>
    </section>
  );
};

export default DiagnosisPendingView;
