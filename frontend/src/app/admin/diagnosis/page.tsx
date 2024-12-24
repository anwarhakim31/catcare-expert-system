"use client";
import { columns } from "@/components/views/admin/diagnosis/column-diagnosis";
import { DiagnosisView } from "@/components/views/admin/diagnosis/diagnosis-view";
import useFetchDiagnosis from "@/hooks/diagnosis/useFetchDiagnosis";
import { useSearchParams } from "next/navigation";
import React from "react";

const DiagnosisPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useFetchDiagnosis(searchParams, "1", "10");

  return (
    <DiagnosisView
      data={data?.data || []}
      isLoading={isLoading}
      paging={data?.paging}
      columns={columns}
    />
  );
};

export default DiagnosisPage;
