"use client";

import { PenyakitView } from "@/components/views/penyakit/penyakit-view";

import { columns } from "@/components/views/penyakit/column-penyakit";
import { Disease } from "@/types/model";
import React from "react";
import useGetDisease from "@/hooks/penyakit/useGetDisease";
import { useSearchParams } from "next/navigation";

const PenyakitPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useGetDisease(
    new URLSearchParams(searchParams),
    "1",
    "10"
  );

  return (
    <PenyakitView
      columns={columns}
      data={(data?.data as Disease[]) || []}
      paging={data?.paging}
      isLoading={isLoading}
    />
  );
};

export default PenyakitPage;
