"use client";
import React from "react";

import { PanelLeftCloseIcon, PanelLeftOpenIcon } from "lucide-react";

import { useAuthContext } from "@/context/AuthContext";
import { Avatar } from "../ui/avatar";
import { formatSplitName } from "@/utils/helpers";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CommandSearch } from "./CommndSearch";
import BreadCrumb from "./breadcrumb";
import { Separator } from "../ui/separator";

import { useRouter } from "next/navigation";
import { ProfileSheet } from "../views/admin/profile/ProfileSheet";

const HeaderAdmin = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const context = useAuthContext();
  const router = useRouter();

  return (
    <header
      className={`${
        isOpen ? "lg:pl-[248px]" : "lg:pl-[90px]"
      } fixed w-full left-0 top-0 z-10 bg-orange-600 shadow-md px-4 py-3.5 lg:pr-8 flex justify-between items-center transition-all duration-300 ease-in-out`}
    >
      <div className="flex gap-2 items-center ">
        <button className="text-white p-1" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <PanelLeftCloseIcon size={20} />
          ) : (
            <PanelLeftOpenIcon size={20} />
          )}
        </button>
        <BreadCrumb />
      </div>

      <div className="flex items-center gap-2">
        <CommandSearch />
        <Popover>
          <PopoverTrigger className="flex gap-2 items-center">
            <Avatar className="w-8 h-8 bg-white hover:bg-orange-100 flex justify-center items-center">
              {context?.userData?.photo ? (
                <Image
                  src={context?.userData?.photo}
                  alt={context?.userData?.fullname || ""}
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              ) : (
                <p className={"uppercase select-none text-sm"}>
                  {formatSplitName(context?.userData?.fullname || "")}
                </p>
              )}
            </Avatar>
          </PopoverTrigger>
          <PopoverContent className="w-40 p-0 mt-3 mr-4">
            <div className="p-2 select-none">
              <p className="text-sm ">{context?.userData?.username}</p>
              <p className="text-xs ">Administrator</p>
            </div>

            <Separator />

            <ProfileSheet />
            <button
              className="text-sm text-left w-full p-2 block hover:bg-orange-50 transition-all duration-200 ease-in-out"
              aria-label="Logout"
              type="button"
              onClick={() => {
                setIsOpen(false);
                router.replace("/login");
                document.cookie =
                  "catcare=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
                context?.setUserData(null);
              }}
            >
              Keluar
            </button>
          </PopoverContent>
        </Popover>
      </div>
    </header>
  );
};

export default HeaderAdmin;
