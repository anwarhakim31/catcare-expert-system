import DashboardView from "@/components/views/admin/dashboard/DashboardView";
import { redirect } from "next/navigation";
import React from "react";

const fetchData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/statistic`, {
    cache: "no-store",
    method: "GET",
  });
  if (!res.ok) {
    return redirect("/error");
  }

  return res.json();
};

const DashboardPage = async () => {
  const data = await fetchData();

  return <DashboardView data={data?.data} />;
};

export default DashboardPage;
