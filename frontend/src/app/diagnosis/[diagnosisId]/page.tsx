import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import HeaderDiagnosis from "@/components/views/diagnosis/HeaderDiagnosis";
import { Fragment } from "react";
import DiagnosisPendingView from "@/components/views/diagnosis/DiagnosisPendingView";

const fetchData = async (id: string, catcare: string) => {
  if (!catcare) return redirect("/login");

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
  console.log(diagnosis);
  return (
    <Fragment>
      <HeaderDiagnosis />

      {diagnosis?.data?.status === "pending" && (
        <DiagnosisPendingView
          diagnosis={diagnosis?.data}
          symptoms={symptoms?.data}
        />
      )}
    </Fragment>
  );
}
