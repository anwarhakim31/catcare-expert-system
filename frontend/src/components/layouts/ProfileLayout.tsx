"use client";
import useLogout from "@/hooks/auth/useLogout";
import { History, LogOut, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { mutate, isPending } = useLogout();

  return (
    <main className="container flex  gap-8  pt-32 pb-20 flex-col md:flex-row">
      <div className="w-full md:max-w-[200px] space-y-4 flex flex-col">
        <Link
          className={`${
            pathname === "/profil"
              ? "bg-orange-500 text-white hover:bg-orange-500 hover:border-orange-500"
              : "text-gray-700 hover:bg-orange-100 hover:border-orange-100"
          } px-4 py-2.5 rounded-md  transition-all ease-in-out duration-300   border w-full flex item-center gap-2 text-center text-sm`}
          href="/profil"
        >
          <User size={20} />
          Profil
        </Link>
        <Link
          className={`${
            pathname === "/riwayat"
              ? "bg-orange-500 text-white hover:bg-orange-500 hover:border-orange-500"
              : "text-gray-700 hover:bg-orange-100 hover:border-orange-100"
          } px-4 py-2.5 rounded-md  transition-all ease-in-out duration-300  border w-full flex item-center gap-2 text-center text-sm`}
          href="/riwayat"
        >
          <History size={20} />
          Riwayat
        </Link>
        <button
          type="button"
          onClick={() => mutate()}
          disabled={isPending}
          className="px-4 py-2.5 rounded-md  transition-all ease-in-out duration-300 text-gray-700 hover:bg-orange-50 border flex item-center gap-2 w-full text-sm"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <section className="flex-1 border rounded-md min-h-[calc(100vh-300px)] p-4">
        {children}
      </section>
    </main>
  );
};

export default ProfileLayout;
