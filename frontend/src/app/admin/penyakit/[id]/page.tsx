import FormPenyakitView from "@/components/views/admin/penyakit/idPenyakit/FormPenyakitView";
import { Disease } from "@/types/model";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";

const getData = async (idPenyakit: string, catcare: string) => {
  if (!catcare) return redirect("/admin/penyakit");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/disease/${idPenyakit}`,
    {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${catcare}`,
      },
    }
  );

  return await res.json();
};

const TambahPenyakitPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const cookie = cookies().get("catcare")?.value;

  let data = null;

  if (id !== "tambah") {
    data = await getData(id, cookie || "");
  }

  return <FormPenyakitView dataEdit={data?.data as Disease} />;
};

export default TambahPenyakitPage;
