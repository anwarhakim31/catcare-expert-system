import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import PenyakitMainView from "@/components/views/penyakit/PenyakitMainView";
import { redirect } from "next/navigation";
import React, { Fragment } from "react";

const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/disease`, {
    cache: "no-store",
    method: "GET",
  });

  if (!res.ok) {
    return redirect("/error");
  }
  return res.json();
};

const PenyakitPage = async () => {
  const data = await fetchData();

  return (
    <Fragment>
      <Header />
      <PenyakitMainView data={data?.data} />
      <Footer />
    </Fragment>
  );
};

export default PenyakitPage;
