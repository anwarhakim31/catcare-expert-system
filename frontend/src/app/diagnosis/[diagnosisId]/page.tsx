import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import HeaderDiagnosis from "@/components/views/diagnosis/HeaderDiagnosis";
import DiagnosisPendingView from "@/components/views/diagnosis/DiagnosisPendingView";
import DiagnosisExpiredView from "@/components/views/diagnosis/DiagnosisExpiredView";
import DiagnosisFinishView from "@/components/views/diagnosis/DiagnosisFinishView";
import { Fragment } from "react";

const fetchData = async (id: string, catcare: string) => {
  if (!id) return redirect(notFound());
  if (!catcare)
    return redirect(
      `/login?callbackUrl=${encodeURIComponent(`/diagnosis/${id}`)}`
    );

  const [resDiagnosis, resSymptomp] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagnosis/${id}`, {
      headers: {
        cookie: `catcare=${catcare}`,
      },
    }),
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/symptom`, {
      headers: {
        cookie: `catcare=${catcare}`,
      },
    }),
  ]);

  if (!resDiagnosis.ok || !resSymptomp.ok) {
    return redirect(notFound());
  }

  return {
    diagnosis: await resDiagnosis.json(),
    symptoms: await resSymptomp.json(),
  };
};

export default async function DiagnosisPage({
  params,
}: {
  params: { diagnosisId: string };
}) {
  const { diagnosisId } = params;
  const cookieStore = cookies();
  const catcare = cookieStore.get("catcare")?.value;

  const { diagnosis, symptoms } = await fetchData(diagnosisId, catcare || "");

  return (
    <Fragment>
      <HeaderDiagnosis />
      {diagnosis?.data?.status === "pending" && (
        <DiagnosisPendingView
          diagnosis={diagnosis?.data}
          symptoms={symptoms?.data}
        />
      )}
      {diagnosis?.data?.status === "cancel" && <DiagnosisExpiredView />}
      {diagnosis?.data?.status === "finish" && (
        <DiagnosisFinishView diagnosis={diagnosis?.data} />
      )}
    </Fragment>
  );
}
