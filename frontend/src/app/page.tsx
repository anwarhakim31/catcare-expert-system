"use client";

import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
  const context = useAuthContext();

  return (
    <>
      <button>logout</button>
      <Link href="/admin">admin</Link>
      <h1>{context?.userData?.fullname}</h1>;
    </>
  );
}
