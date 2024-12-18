"use client";
import { AturanView } from "@/components/views/aturan/aturan-view";
import { columns } from "@/components/views/aturan/column-aturan";
import useFetchRules from "@/hooks/aturan/useFetchRule";
import { useSearchParams } from "next/navigation";
import React from "react";

const AturanPage = () => {
  const searcParams = useSearchParams();
  const { data, isPending } = useFetchRules(
    new URLSearchParams(searcParams),
    "1",
    "10"
  );

  return (
    <AturanView
      columns={columns}
      data={data?.data || []}
      paging={data?.paging}
      isLoading={isPending}
    />
  );
};

export default AturanPage;
