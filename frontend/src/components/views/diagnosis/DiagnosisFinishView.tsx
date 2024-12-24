"use client";
import PushButton from "@/components/ui/push-button";
import usePostDiagnosis from "@/hooks/diagnosis/usePostDiagnosis";
import { Diagnosis } from "@/types/model";
import { formatDateIndo } from "@/utils/helpers";
import { Printer } from "lucide-react";
import Link from "next/link";
import React, { Fragment } from "react";
import { ModalDetailDisease } from "./ModalDetailDisease";
import { usePathname } from "next/navigation";

const DiagnosisFinishView = ({ diagnosis }: { diagnosis: Diagnosis }) => {
  const pathname = usePathname();
  const handlePrint = () => {
    window.print();
  };

  const { mutate, isPending } = usePostDiagnosis();

  return (
    <section className="relative z-1 w-full pt-[80px] md:pt-[100px] px-4 pb-[50px]  flex flex-col justify-between]">
      <div className="w-full max-w-[768px] mx-auto flex justify-center flex-col">
        <div className="w-full flex justify-between items-center gap-4 mb-4">
          <button
            onClick={handlePrint}
            type="button"
            aria-label="Print"
            title="Print"
            className="no-print w-8 h-8 border flex items-center justify-center rounded-full border-gray-500 hover:bg-gray-100"
          >
            <Printer size={20} strokeWidth={1.5} />
          </button>
          <p className="text-sm">
            {formatDateIndo(diagnosis.createdAt as Date)}
          </p>
        </div>
        <h1 className="text-lg font-semibold text-center tracking-wider">
          Hasil Dan Solusi
        </h1>

        <h3 className="mt-8 w-full text-base  tracking-wider text-orange-500 text-center font-semibold">
          Diagnosis
        </h3>
        <div className="border-t-2 rounded-xl border-orange-500 p-4  mt-2">
          <h5 className="font-semibold mb-2 text-base text-orange-500">
            Gejala
          </h5>
          <ol className="list-decimal list-inside  w-full text-sm text-gray-700">
            {diagnosis?.symptoms
              ?.filter((symptom) => symptom.answer)
              .map((symptom) => (
                <li key={symptom.id} className="capitalize">
                  {symptom.symptom}
                </li>
              ))}
          </ol>
          <h5 className="font-semibold my-2 text-base text-orange-500">
            Penyakit
          </h5>
          <p className="text-gray-700 text-sm">
            Bedasarkan gejala dari diagnosis yang anda lakukan, Kucing anda
            terdeteksi memiliki penyakit{" "}
            {diagnosis?.disease && diagnosis.disease.length === 1 ? (
              <span className="font-semibold">{diagnosis.disease[0].name}</span>
            ) : diagnosis?.disease?.length === 2 ? (
              diagnosis?.disease?.map((disease, index) => {
                return (
                  <Fragment key={disease.id}>
                    <span className="font-bold capitalize">{disease.name}</span>
                    {diagnosis?.disease &&
                      index !== diagnosis?.disease?.length - 1 &&
                      " dan "}
                  </Fragment>
                );
              })
            ) : (
              diagnosis?.disease?.map((disease, index) => {
                return (
                  <Fragment key={disease.id}>
                    <span className="font-bold capitalize">{disease.name}</span>
                    {diagnosis?.disease &&
                      index < diagnosis?.disease?.length - 1 &&
                      ", "}
                    {diagnosis?.disease &&
                      index !== diagnosis?.disease?.length - 1 &&
                      " dan "}
                  </Fragment>
                );
              })
            )}{" "}
            dengan tingkat keparahan{" "}
            <span className="font-semibold">{diagnosis?.scor}</span>%.
          </p>
        </div>
        <h3 className="mt-8 w-full text-base  tracking-wider text-orange-500 text-center font-semibold">
          Solusi
        </h3>
        <div
          className={`min-h-56 border-t-2 rounded-xl border-orange-500 p-4 mt-2 grid ${
            diagnosis?.disease && diagnosis?.disease?.length > 1
              ? "md:grid-cols-2"
              : "md:grid-cols-1"
          } gap-4 `}
        >
          {diagnosis?.disease?.map((disease) => (
            <div className="w-full" key={disease.id}>
              <div className="flex gap-2 items-center">
                <h5 className="font-semibold my-2 text-base capitalize text-orange-500">
                  {disease.name}
                </h5>
                <ModalDetailDisease disease={disease} />
              </div>
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {disease.solution}
              </p>
            </div>
          ))}
        </div>
        <div className=" w-full text-sm flex gap-4 justify-center items-center mt-4 border-t-2 border-orange-500 pt-10">
          <PushButton
            loading={false}
            className="no-print  border   border-blue-700"
            shadowColor="shadow-blue-700"
            bgColor="white"
          >
            <Link
              href={
                pathname.startsWith("/riwayat/") ? "/riwayat" : "/diagnosis"
              }
              className=" w-full h-8 flex items-center justify-center"
              replace
            >
              Kembali
            </Link>
          </PushButton>
          {pathname.startsWith("/diagnosis") && (
            <PushButton
              loading={isPending}
              className="no-print flex items-center border justify-center h-8 border-orange-500"
              shadowColor="shadow-orange-500"
              bgColor="white"
              onClick={() => mutate()}
            >
              <span className="">Diagnosis</span>
            </PushButton>
          )}
        </div>
      </div>
    </section>
  );
};

export default DiagnosisFinishView;
