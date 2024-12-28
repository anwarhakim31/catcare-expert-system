import AuthLayout from "@/components/layouts/AuthLayout";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Masuk`,
  description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
  openGraph: {
    title: `Masuk`,
    description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
  },
};

const LoginPage = () => {
  return <AuthLayout />;
};

export default LoginPage;
