import React from "react";

const SectionLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <section className="mx-4 mt-20 mb-8 p-4  rounded-md ">{children}</section>
  );
};

export default SectionLayout;
