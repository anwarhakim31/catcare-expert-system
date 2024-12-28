import Footer from "@/components/fragments/footer";
import Header from "@/components/fragments/header";
import KlinikMainView from "@/components/views/klinik/KlinikMainView";
import { Metadata } from "next";

import React, { Fragment } from "react";
export const metadata: Metadata = {
  title: `Klinik`,
  description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
  openGraph: {
    title: `Klinik`,
    description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
  },
};
const page = () => {
  return (
    <Fragment>
      <Header />
      <KlinikMainView />
      <Footer />
    </Fragment>
  );
};

export default page;
