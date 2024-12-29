import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import { RiwayatMainView } from "@/components/views/riwayat/RiwayatMainView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

const fetchData = async (catcare: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/diagnosis/user`, {
    cache: "no-store",
    method: "GET",
    headers: {
      Authorization: `Bearer ${catcare}`,
    },
  });

  if (!res.ok) {
    return redirect("/error");
  }

  return res.json();
};

const page = async () => {
  const token = cookies();

  const data = await fetchData(token.get("catcare")?.value || "");

  return (
    <Fragment>
      <Header />
      <RiwayatMainView data={data?.data || []} />
      <Footer />
    </Fragment>
  );
};

export default page;
