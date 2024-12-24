import DiagnosisFinishView from "@/components/views/diagnosis/DiagnosisFinishView";
import HeaderDiagnosis from "@/components/views/diagnosis/HeaderDiagnosis";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";
import React from "react";

const fetchData = async (id: string, catcare: string) => {
  if (!id) return redirect(notFound());
  if (!catcare)
    return redirect(
      `/login?callbackUrl=${encodeURIComponent(`/riwayat/${id}`)}`
    );

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/diagnosis/${id}`,
    {
      headers: {
        cookie: `catcare=${catcare}`,
      },
    }
  );

  if (!res.ok) {
    return redirect(notFound());
  }

  return res.json();
};

const RiwayatDiagnosisPage = async ({ params }: { params: { id: string } }) => {
  const cookie = cookies();

  const data = await fetchData(params.id, cookie.get("catcare")?.value || "");

  return (
    <>
      <HeaderDiagnosis />
      <DiagnosisFinishView diagnosis={data?.data} />
    </>
  );
};

export default RiwayatDiagnosisPage;
