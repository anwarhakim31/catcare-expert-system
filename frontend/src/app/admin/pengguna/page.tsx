"use client";
import { columns } from "@/components/views/admin/pengguna/column-pengguna";
import { PenggunaView } from "@/components/views/admin/pengguna/pengguna-view";
import useFetchUser from "@/hooks/user/useFetchUser";
import { useSearchParams } from "next/navigation";
import React from "react";

const UserPage = () => {
  const searchParams = useSearchParams();
  const { data, isLoading } = useFetchUser(
    new URLSearchParams(searchParams),
    "1",
    "10"
  );

  return (
    <PenggunaView
      data={data?.data || []}
      columns={columns}
      paging={{ page: 1, limit: 10, total: 0, totalPage: 0 }}
      isLoading={isLoading}
    />
  );
};

export default UserPage;
