"use client";
import {
  Biohazard,
  ClipboardList,
  LayoutDashboard,
  ListChecksIcon,
  SearchCheck,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useRef } from "react";

const NavItem = [
  {
    id: 1,
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: (
      <LayoutDashboard size={20} strokeWidth={1.5} className="flex-shrink-0 " />
    ),
  },
  {
    id: 3,
    name: "Penyakit",
    path: "/admin/penyakit",
    icon: <Biohazard size={20} strokeWidth={1.5} className="flex-shrink-0 " />,
  },
  {
    id: 4,
    name: "Gejala",
    path: "/admin/gejala",
    icon: (
      <SearchCheck size={20} strokeWidth={1.5} className="flex-shrink-0 " />
    ),
  },
  {
    id: 5,
    name: "Aturan",
    path: "/admin/aturan",
    icon: (
      <ClipboardList size={20} strokeWidth={1.5} className="flex-shrink-0 " />
    ),
  },
  {
    id: 6,
    name: "Pengguna",
    path: "/admin/pengguna",
    icon: <Users size={20} strokeWidth={1.5} className="flex-shrink-0 " />,
  },
  {
    id: 7,
    name: "Diagnosis",
    path: "/admin/diagnosis",
    icon: (
      <ListChecksIcon size={20} strokeWidth={1.5} className="flex-shrink-0 " />
    ),
  },
];

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const pathname = usePathname();
  const [hover, setHover] = React.useState("");
  const sideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideRef.current &&
        window.innerWidth < 960 &&
        !sideRef.current.contains(event.target as Node)
      ) {
        setIsOpen(true);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  return (
    <aside
      ref={sideRef}
      className={` ${
        !isOpen ? "left-0  lg:w-[60px]" : "-left-[250px] lg:w-[220px]"
      } transition-[width left] duration-300 w-[250px] fixed lg:static  bg-white z-20  ease-in-out`}
    >
      <div className="lg:fixed  min-h-screen top-0 left-0 w-[inherit] shadow-md bg-white">
        <div
          className={`${
            isOpen ? "lg:px-6" : "lg:px-1"
          } flex items-center justify-between gap-2 px-2 py-1 bg-orange-500 h-[60px] overflow-hidden transition-all duration-300 ease-in-out`}
        >
          <div className="flex items-center gap-1.5  text-white justify-center ">
            <Image
              src={"/logo.png"}
              width={50}
              height={50}
              alt="logo"
              priority
            />
            <span className="font-medium truncate">Catcare.</span>
          </div>
          <button className="block lg:hidden text-white">
            <X size={20} onClick={() => setIsOpen(!isOpen)} />
          </button>
        </div>
        <ul
          className={`${
            isOpen ? " md:px-6" : "md:px-2"
          }  space-y-2 px-2 py-2 mt-4 transition-all duration-300 ease-in-out`}
        >
          {NavItem.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "bg-orange-600 text-white"
                    : "text-black hover:bg-orange-100"
                } flex items-center  text-sm px-3 py-2  gap-2 rounded-md relative`}
                onMouseEnter={() => setHover(item.name)}
                onMouseLeave={() => setHover("")}
              >
                {item.icon}
                <span className="truncate ">{item.name}</span>
                {!isOpen && hover === item.name && (
                  <span className="absolute hidden lg:block -right-[110px] w-[100px] p-2.5 rounded-md text-xs font-medium  bg-orange-500 text-white before:absolute before:-left-3 before:top-0  before:w-3 before:h-full">
                    {item.name}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
