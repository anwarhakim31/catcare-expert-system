"use client";
import HeaderAdmin from "@/components/fragments/header-admin";
import Sidebar from "@/components/fragments/sidebar";

import React from "react";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [IsOpen, setIsOpen] = React.useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={IsOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 flex flex-col overflow-hidden">
        <HeaderAdmin isOpen={IsOpen} setIsOpen={setIsOpen} />
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
