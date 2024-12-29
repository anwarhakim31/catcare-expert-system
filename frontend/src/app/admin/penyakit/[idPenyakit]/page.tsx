import FormPenyakitView from "@/components/views/admin/penyakit/idPenyakit/FormPenyakitView";
import { Disease } from "@/types/model";
import { redirect } from "next/navigation";
import React from "react";
import { cookies } from "next/headers";

const getData = async (idPenyakit: string, catcare: string) => {
  if (!catcare) return redirect("/admin/penyakit");
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/disease/${idPenyakit}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${catcare}`,
        },
      }
    );

    if (!res.ok) {
      return redirect("/admin/penyakit"); // or return some error page
    }

    return await res.json();
  } catch (error) {
    console.error(error);
    return redirect("/admin/penyakit"); // Handle network error or unexpected issues
  }
};

const TambahPenyakitPage = async ({
  params,
}: {
  params: { idPenyakit: string };
}) => {
  const { idPenyakit } = params;
  const cookie = cookies().get("catcare")?.value || "";

  let data = null;

  if (idPenyakit !== "tambah") {
    data = await getData(idPenyakit, cookie || "");
  }

  return <FormPenyakitView dataEdit={data?.data as Disease} />;
};

export default TambahPenyakitPage;
