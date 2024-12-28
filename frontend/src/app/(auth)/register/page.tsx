import AuthLayout from "@/components/layouts/AuthLayout";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: `Daftar`,
  description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
  openGraph: {
    title: `Daftar`,
    description: `Sistem Pakar Diagnosis Penyakit Kulit Kucing`,
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
  },
};
const RegisterPage = () => {
  return <AuthLayout />;
};

export default RegisterPage;
