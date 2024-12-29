import FormPenyakitView from "@/components/views/admin/penyakit/idPenyakit/FormPenyakitView";
import { Disease } from "@/types/model";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { cookies } from "next/headers";

const getData = async (idPenyakit: string, catcare: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/disease/${idPenyakit}`,
    {
      headers: {
        Authorization: `Bearer ${catcare}`,
      },
    }
  );

  if (!res.ok) {
    return redirect("/admin/penyakit");
  }

  return res.json();
};

const TambahPenyakitPage = async ({
  params,
}: {
  params: { idPenyakit: string };
}) => {
  const { idPenyakit } = params;
  const cookie = cookies().get("catcare")?.value;

  if (!cookie) {
    return redirect("/admin/penyakit");
  }

  let data = null;

  if (idPenyakit !== "tambah") {
    data = await getData(idPenyakit, cookie || "");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FormPenyakitView dataEdit={data?.data as Disease} />
    </Suspense>
  );
};

export default TambahPenyakitPage;
