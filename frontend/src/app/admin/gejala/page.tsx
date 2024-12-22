"use client";
import { columns } from "@/components/views/admin/gejala/column-gejala";
import { GejalaView } from "@/components/views/admin/gejala/gejala-view";
import useFetchSymptom from "@/hooks/gejala/useFetchSymptom";
import { useSearchParams } from "next/navigation";
import React from "react";

const GejalaPage = () => {
  const searchParams = useSearchParams();
  const { isPending, data } = useFetchSymptom(
    new URLSearchParams(searchParams),
    "1",
    "10"
  );

  return (
    <GejalaView
      columns={columns}
      data={data?.data || []}
      isLoading={isPending}
      paging={data?.paging}
    />
  );
};

export default GejalaPage;
