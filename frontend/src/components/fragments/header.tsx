"use client";
import { useAuthContext } from "@/context/AuthContext";
import { navheader } from "@/utils/constant";
import { formatSplitName } from "@/utils/helpers";
import { AlignJustify, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const Header = () => {
  const pathname = usePathname();
  const context = useAuthContext();
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
    <div className="relative">
      <header
        className={`fixed top-0 left-0 w-full z-[1000] bg-white py-1 ${
          isScrolled ? "shadow-[0_5px_20px_0_rgba(0,0,0,0.1)]" : ""
        }`}
      >
        <div className="container flex justify-between items-center w-full gap-4 flex-wrap">
          <Link
            href="/"
            prefetch
            className="flex gap-1 items-center"
            onClick={handleToggle}
          >
            <Image
              src={"/logo.png"}
              alt="logo"
              width={50}
              height={50}
              priority
            />
            <h3 className="text-xl text-gray-900  font-bold">Catcare.</h3>
          </Link>

          <nav
            className={`${
              isOpen
                ? " left-0  top-[58px] z-30 bg-white   flex-col "
                : "fixed top-[58px] -left-full   flex-col "
            } fixed w-full flex justify-center items-center  h-[calc(100vh-64px)] gap-8 ml-auto md:h-auto md:w-auto order-3 md:static md:flex-row  md:order-none  md:gap-4 transition-all duration-500 ease-in-out md:transition-none`}
          >
            {navheader.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "text-orange-500"
                    : "  transition-colors duration-300 ease-in-out text-gray-600  after:h-0.5 after:w-0 after:bg-orange-500 after:absolute after:bottom-0 after:left-0 after:transition-all after:duration-300 after:ease-in-out hover:after:w-full "
                } block text-sm  font-medium  px-2 py-0.5 relative `}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex gap-4 items-center">
            {context?.userData ? (
              <Link
                href="/profil"
                className="w-8 h-8 overflow-hidden rounded-full bg-orange-300 flex justify-center items-center"
              >
                {context.userData.photo ? (
                  <Image
                    src={context.userData.photo}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                    priority
                  />
                ) : (
                  <span className="uppercase text-sm text-white">
                    {formatSplitName(context?.userData.fullname || "")}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs md:text-sm bg-orange-500 text-white py-0.5  px-4 rounded-2xl font-light hover:bg-orange-400 transition-none"
              >
                Masuk
              </Link>
            )}
            <button
              type="button"
              aria-label="toggle"
              aria-expanded={isOpen}
              onClick={handleToggle}
              className="flex md:hidden justify-center items-center w-6 h-6"
            >
              {isOpen ? <X /> : <AlignJustify />}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
