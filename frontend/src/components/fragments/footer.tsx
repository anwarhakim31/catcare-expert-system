"use client";
import { ChevronUp, Github } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="relative  p-4 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700 ">
      <button
        type="button"
        onClick={handleClick}
        aria-label="scroll to top"
        className="absolute left-1/2  -translate-x-1/2 top-[-35px] border bg-gray-100 w-16 h-16 rounded-full flex justify-center items-center"
      >
        <ChevronUp className="h-8 w-8 text-orange-500 animate-bounce" />
      </button>
      <div className="container pt-6">
        <div className="  flex items-center justify-between gap-8 flex-col md:flex-row">
          <div className="flex gap-2 items-center">
            <Image src={"/logo.png"} alt="logo" width={50} height={50} />
            <h3 className="text-xl text-white  font-bold">Catcare.</h3>
          </div>
          <h1 className="text-sm text-white">
            Sistem Pakar Diagnosis Penyakit Kulit Kucing
          </h1>
          <Link
            href="https://github.com/anwarhakim31"
            className="flex gap-2 text-white text-sm items-center"
          >
            <Github />
            <span>anwarhakim31</span>
          </Link>
        </div>
        <Separator className="my-4" />

        <p className="text-xs text-white text-center">
          Copyright &copy; 2024 Catcare.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
