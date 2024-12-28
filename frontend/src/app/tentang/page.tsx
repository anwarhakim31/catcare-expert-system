import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import TentangMainView from "@/components/views/tentang/TentangMainview";
import { Metadata } from "next";
import React, { Fragment } from "react";

export const metadata: Metadata = {
  title: `Tentang`,
  description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
  openGraph: {
    title: `Tentang`,
    description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
  },
};

const TentangPage = () => {
  return (
    <Fragment>
      <Header />
      <TentangMainView />
      <Footer />
    </Fragment>
  );
};
export default TentangPage;
