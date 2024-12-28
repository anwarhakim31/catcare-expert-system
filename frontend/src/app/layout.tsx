import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";

import "./globals.css";
import ReactQueryProvider from "@/components/Providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/context/AuthContext";

import { cookies } from "next/headers";

export const metadata: Metadata = {
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_DOMAIN}/`),
  title: {
    default: "Catcare",
    template: "%s | Catcare",
  },
  icons: {
    icon: "/favicon.ico",
  },
  description: "Sistem Pakar Diagnosis Penyakit Kulit Kucing",
  openGraph: {
    title: "Catcare",
    description: "Sistem Pakar Diagnosis Penyakit Kulit Kucing",
    type: "website",
    locale: "id_ID",
    url: `${process.env.NEXT_PUBLIC_DOMAIN}/`,
    siteName: "Catcare",
  },
};

const fetchUserData = async (token: string | null) => {
  if (!token) return null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/current`, {
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch user data:", error);
    return null;
  }
};

const openSans = Inter_Tight({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();
  const token = cookieStore.get("catcare")?.value || null;

  const userData = await fetchUserData(token);

  return (
    <ReactQueryProvider>
      <AuthProvider data={userData?.data}>
        <html lang="en">
          <body className={openSans.className}>
            {children}
            <Toaster theme="light" position="top-center" richColors />
          </body>
        </html>
      </AuthProvider>
    </ReactQueryProvider>
  );
}
