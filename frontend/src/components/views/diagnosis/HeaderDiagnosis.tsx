import Image from "next/image";
import React from "react";

const HeaderDiagnosis = () => {
  return (
    <header className="fixed w-full z-50 left-0 top-0  md:p-2 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700">
      <div className="flex md:justify-between items-center px-4 md:container">
        <figure>
          <Image src="/logo.png" alt="logo" width={50} height={50} priority />
        </figure>
        <h3 className="text-lg text-white font-bold">Catcare.</h3>
      </div>
    </header>
  );
};

export default HeaderDiagnosis;
