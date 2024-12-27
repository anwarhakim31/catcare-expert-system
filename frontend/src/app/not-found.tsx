"use client";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center bg-[url('/not-found.jpg')] bg-cover bg-bottom">
      <h1 className="text-9xl font-bold bg-gradient-to-t from-orange-400 mb-2 via-orange-500 to-orange-700 bg-clip-text text-transparent">
        404
      </h1>
      <p className="text-2xl font-semibold text-orange-500">
        Data Tidak Ditemukan
      </p>
      <Link href="/" className="btn btn-primary mt-4 h-8">
        Kembali ke Beranda
      </Link>
    </div>
  );
};

export default NotFound;
