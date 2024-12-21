"use client";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const nav = [
  {
    id: 1,
    name: "Beranda",
    path: "/",
  },
  {
    id: 2,
    name: "Penyakit",
    path: "/penyakit",
  },
  {
    id: 3,
    name: "Tentang",
    path: "/tentang",
  },
];

const Header = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [delay, setDelay] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const handleToggle = () => {
    setDelay(true);
    if (delay) return;

    const timeout = setTimeout(() => {
      setIsOpen(!isOpen);
      setDelay(false);
    }, 400);
    return () => clearTimeout(timeout);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isScrolled]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1000] bg-white py-1 ${
        isScrolled ? "shadow-[0_5px_20px_0_rgba(0,0,0,0.1)]" : ""
      }`}
    >
      <div className="container flex justify-between items-center w-full gap-4 flex-wrap">
        <Link href="/" className="flex gap-2 items-center">
          <Image src={"/logo.png"} alt="logo" width={50} height={50} />
          <h3 className="text-xl text-gray-700  font-bold">Catcare.</h3>
        </Link>

        <nav
          className={`${
            isOpen
              ? " left-0  top-[64px] z-30 bg-white   flex-col "
              : "fixed top-[64px] -left-full   flex-col "
          } fixed w-full flex justify-center items-center  h-[calc(100vh-64px)] gap-8 ml-auto sm:h-auto sm:w-auto order-3 sm:static sm:flex-row  sm:order-none  sm:gap-4 transition-all duration-500 ease-in-out sm:transition-none`}
        >
          {nav.map((item) => (
            <Link
              key={item.id}
              href={item.path}
              className="block text-sm  font-medium text-gray-700 hover:text-orange-500  transition-colors duration-300 ease-in-out py-0.5 relative px-2 after:h-0.5 after:w-0 after:bg-orange-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex gap-4">
          <Link
            href="/login"
            className="text-sm bg-orange-500 text-white py-0.5  px-4 rounded-2xl font-light hover:bg-orange-400 transition-colors duration-500 ease-in-out"
          >
            Masuk
          </Link>

          <button
            type="button"
            aria-label="toggle"
            aria-expanded={isOpen}
            onClick={handleToggle}
            className="flex sm:hidden justify-center items-center w-6 h-6"
          >
            {isOpen ? <X /> : <AlignJustify />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
