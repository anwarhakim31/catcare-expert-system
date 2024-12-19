"use client";
import CountdownFragment from "@/components/fragments/countdown";
import PushButton from "@/components/ui/push-button";

import usePatchDiagnosis from "@/hooks/diagnosis/usePatchDiagnosis";
import { Diagnosis, Symptom } from "@/types/model";

import { Check, X } from "lucide-react";
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

  const { mutate } = usePatchDiagnosis(diagnosis);

  const handleNext = () => {
    const clonse = [...answer];
    clonse.push({
      id: symptoms[index].id,
      symptom: symptoms[index].symptom,
      answer: true,
    });

    setAnswer(clonse);

    if (index < symptoms.length - 1) {
      const now = new Date().getTime();
      const expired = new Date(diagnosis.expired * 1000).getTime();
      const answerData = {
        ...diagnosis,
        symptoms: clonse,
        expired: Math.floor((expired - now) / 1000),
      };
      setIndex(index + 1);
      mutate(answerData);
    } else {
      const answerData = {
        ...diagnosis,
        symptoms: clonse,
        status: "finish",
        expired: 1000,
      };
      mutate(answerData, {
        onSuccess: () => {
          router.refresh();
        },
      });
    }
  };

  return (
    <main className="w-full h-screen pt-[60px] md:pt-[80px] p-4">
      <div className="w-full h-[50px] md:container flex justify-between items-center">
        <p className="font-medium text-lg">
          Gejala ({index + 1}/{symptoms.length})
        </p>
        <CountdownFragment diagnosis={diagnosis} />
      </div>
      <div className="flex justify-center items-center flex-col  h-[calc(100vh-140px)]">
        <div className="h-[200px] w-full max-w-[400px] md:max-w-[600px] flex justify-center items-center shadow-md border border-gray-300 scroll-hidden  rounded-md overflow-auto">
          <p className="text-gray-800 md:text-base whitespace-pre-line">
            {symptoms[index].symptom}
          </p>
        </div>
        <div className="w-full flex items-center gap-4 mt-10 justify-center flex-col md:flex-row">
          <PushButton
            loading={false}
            bgColor="bg-white"
            className="text-black max-w-[400px] w-full  border border-red-500 "
            shadowColor="shadow-red-600"
          >
            <div className="flex items-center w-full justify-center gap-8 relative overflow-hidden h-10">
              <span>Tidak</span>
              <div className=" bg-red-500 absolute right-4 top-1/2 rounded-full -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <X size={18} className="text-white" />
              </div>
            </div>
          </PushButton>
          <PushButton
            loading={false}
            bgColor="bg-white"
            className="text-black max-w-[400px] w-full  border border-green-500 "
            shadowColor="shadow-green-500"
            onClick={() => handleNext()}
          >
            <div className="flex items-center w-full justify-center gap-8 relative h-10 overflow-hidden">
              <span>Ya</span>
              <div className=" bg-green-500 absolute right-4 top-1/2 rounded-full -translate-y-1/2 w-8 h-8 flex items-center justify-center">
                <Check size={18} className="text-white" />
              </div>
            </div>
          </PushButton>
        </div>
      </div>
    </main>
  );
};

export default DiagnosisPendingView;
