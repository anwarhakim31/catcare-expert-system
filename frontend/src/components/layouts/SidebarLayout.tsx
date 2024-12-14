"use client";
import { Biohazard, LayoutDashboard, X } from "lucide-react";
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
    id: 2,
    name: "Penyakit",
    path: "/admin/penyakit",
    icon: <Biohazard size={20} strokeWidth={1.5} className="flex-shrink-0 " />,
  },
];

const SidebarLayout = ({
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
        window.innerWidth < 768 &&
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
        !isOpen ? "left-0  md:w-[60px]" : "-left-[250px]  md:w-[200px]"
      } transition-[width left] duration-300 w-[250px] fixed md:static  bg-white z-20  ease-in-out`}
    >
      <div className="md:fixed  min-h-screen top-0 left-0 w-[inherit] shadow-md bg-white">
        <div className="flex items-center justify-between gap-2 p-1 bg-orange-500 h-[60px] overflow-hidden">
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
          <button className="block md:hidden text-white">
            <X size={20} onClick={() => setIsOpen(!isOpen)} />
          </button>
        </div>
        <ul className="space-y-2 p-2 mt-4">
          {NavItem.map((item) => (
            <li key={item.id}>
              <Link
                href={item.path}
                className={`${
                  pathname === item.path
                    ? "bg-orange-600 text-white"
                    : "text-black hover:bg-orange-50"
                } flex items-center  text-sm px-3 py-2  gap-2 rounded-md relative`}
                onMouseEnter={() => setHover(item.name)}
                onMouseLeave={() => setHover("")}
              >
                {item.icon}
                <span className="truncate ">{item.name}</span>
                {!isOpen && hover === item.name && (
                  <span className="absolute hidden md:block -right-[110px] w-[100px] p-2.5 rounded-md text-xs font-medium  bg-orange-500 text-white before:absolute before:-left-3 before:top-0  before:w-3 before:h-full">
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

export default SidebarLayout;
