"use client";
import Image from "next/image";
import React, { Fragment } from "react";
import LoginView from "../views/(auth)/LoginView";
import { usePathname } from "next/navigation";
import RegisterView from "../views/(auth)/RegisterView";
import ForgetPasswordView from "../views/(auth)/ForgetPasswordView";

const AuthLayout = () => {
  const pathname = usePathname();

  return (
    <Fragment>
      <header className=" fixed w-full left-0 top-0  md:p-8">
        <div className="flex md:justify-between items-center container">
          <figure>
            <Image src="/logo.png" alt="logo" width={75} height={75} priority />
          </figure>
          <h3 className="text-xl text-gray-900 md:text-white font-bold">
            Catcare.
          </h3>
        </div>
      </header>
      <div className="w-screen h-screen md:bg-orange-300 flex justify-center items-center">
        <div className="w-full max-w-[600px] bg-white  md:rounded-md md:shadow-md  overflow-hidden">
          <div className="flex  justify-between">
            <div className="p-10 flex-1">
              <div className=" mb-10">
                <h1 className="text-lg font-semibold">Selamat Datang</h1>
                <p className="text-sm text-gray-700">
                  {pathname === "/login" &&
                    "Silahkan masuk dengan akun terdaftar"}
                  {pathname === "/register" &&
                    "Silahkan daftar untuk membuat akun"}
                  {pathname === "/forget-password" &&
                    "Silahkan ganti kata sandi anda dengan akun terdaftar"}
                </p>
              </div>
              {pathname === "/login" && <LoginView />}
              {pathname === "/register" && <RegisterView />}
              {pathname === "/forget-password" && <ForgetPasswordView />}
            </div>
            <figure className="w-[225px] hidden md:block">
              <Image
                src={"/DSC00950.jpeg"}
                alt="DSC00950"
                width={400}
                height={300}
                className="object-cover w-full h-full"
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