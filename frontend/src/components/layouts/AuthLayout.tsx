"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import LoginView from "../views/(auth)/LoginView";
import { usePathname } from "next/navigation";
import RegisterView from "../views/(auth)/RegisterView";
import ForgetPasswordView from "../views/(auth)/ForgetPasswordView";
import Link from "next/link";

const AuthLayout = () => {
  const pathname = usePathname();

  return (
    <Fragment>
      <header className="absolute w-full left-0 top-0  md:p-4">
        <div className="flex md:justify-between items-center container">
          <figure>
            <Image src="/logo.png" alt="logo" width={75} height={75} priority />
          </figure>
          <Link
            href="/"
            className="text-xl text-gray-900 md:text-white font-bold"
          >
            Catcare.
          </Link>
        </div>
      </header>
      <div className="w-screen h-screen md:bg-orange-300 flex justify-center items-center">
        <div className="w-full max-w-[700px] bg-white  md:rounded-md md:shadow-md  overflow-hidden">
          <div className="flex  justify-between">
            <div className="py-14 px-10 flex-1">
              <div className=" mb-8">
                <h1 className="text-lg font-semibold">Selamat Datang</h1>
                <p className="text-sm mt-1 text-gray-700">
                  {pathname === "/register"
                    ? "Silahkan daftar untuk membuat akun"
                    : pathname === "/forget-password"
                    ? "Silahkan ganti kata sandi anda dengan akun terdaftar"
                    : "Silahkan masuk dengan akun terdaftar"}
                </p>
              </div>

              {pathname === "/register" ? (
                <RegisterView />
              ) : pathname === "/forget-password" ? (
                <ForgetPasswordView />
              ) : (
                <LoginView />
              )}
            </div>
            <figure className="w-[275px] min-h-[400px]  hidden md:block relative">
              <Image
                src="/DSC00950.jpeg"
                alt="DSC00950"
                width={0}
                height={0}
                sizes="100vw"
                className="w-full h-full object-cover"
                priority
              />
            </figure>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default AuthLayout;
