import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="mt-10 p-4 flex items-center justify-center bg-gradient-to-r from-orange-400 via-orange-500 to-orange-700">
      <p className="text-sm text-white text-center">
        Copyright &copy; 2024 Catcare. Made with{" "}
        <span className="text-red-700">❤</span> by{" "}
        <Link href="https://github.com/anwarhakim31" target="_blank">
          Anwar Hakim
        </Link>
      </p>
    </footer>
  );
};

export default Footer;
