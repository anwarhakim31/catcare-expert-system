"use client";
import { useAuthContext } from "@/context/AuthContext";
import { TotalDashboard } from "@/utils/constant";
import { formatDateIndo } from "@/utils/helpers";
import { Calendar, Info } from "lucide-react";
import React, { Fragment } from "react";
import { LineChartComp } from "./LineChart";
import { Statistic } from "@/types/model";
import { PieChartComponent } from "./PieChart";
import { Separator } from "@/components/ui/separator";

const DashboardView = ({
  data,
  modus,
}: {
  data: Statistic;
  modus: { disease: string; modus: string; fill: string }[];
}) => {
  const context = useAuthContext();

  return (
    <Fragment>
      <div className="bg-gradient-to-tr from-orange-400 via-orange-500 to-orange-700 w-full h-[250px] py-24 px-8 ">
        <h1 className="text-xl text-white font-medium mb-3">
          Hi, {context?.userData?.fullname || "admin"} 👋
        </h1>
        <p className="text-white/80 text-xs md:text-sm mb-2">
          Selamat Datang di Dashboard Admin Catcare - Sistem Pakar Diagnosis
          Penyakit Kulit Kucing
        </p>
        <div className="flex gap-2 ">
          <Calendar size={16} className=" text-white/80" />
          <p className="text-white/80 text-xs md:text-sm">
            {formatDateIndo(new Date())}
          </p>
        </div>
      </div>
      <div className="flex gap-6 flex-col  xl:flex-row mx-8 -mt-10">
        <div className="w-full  h-max  ">
          <div className="flex flex-col sm:grid gap-6 sm:grid-cols-2">
            {TotalDashboard.map((item) => (
              <div
                key={item.title}
                className=" rounded-md h-max  p-2 bg-white shadow-md flex gap-4"
              >
                <div
                  className={`w-14 h-14 rounded-md flex justify-center items-center ${
                    item.title === "Gejala" && "bg-red-500 "
                  } ${item.title === "Penyakit" && "bg-blue-500 "} ${
                    item.title === "Pengguna" && "bg-purple-500 "
                  } ${item.title === "Diagnosis" && "bg-green-500 "}`}
                >
                  <item.icon size={20} className="text-white" />
                </div>
                <div className="py-0.5  ">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-medium ">Total {item.title}</h3>
                    <Info size={18} className="text-white fill-gray-400" />
                  </div>
                  <p className="mt-2.5 text-gray-700">
                    {data.total[item.data as keyof typeof data.total]}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <PieChartComponent modus={modus} />
        </div>
        <div className="w-full  xl:flex-row ">
          <LineChartComp statistic={data.last3month} />
        </div>
      </div>
      <div className="rounded-md  mt-6 col-span-2 mx-8 mb-10  p-3 shadow-md bg-gradient-to-tr from-blue-400 via-blue-500 to-blue-700">
        <h3 className="text-sm text-white">Gejala Pada Setiap Penyakit</h3>
        <Separator className="my-2" />
        <div className="h-max  w-full">
          {data.detailedSymptoms.map((item) => (
            <div
              key={item.disease}
              className="flex items-center gap-2 text-white"
            >
              <p className="text-sm font-medium ">{item.disease}</p>
              <p className="text-sm">
                : {item.symptoms.map((s) => s).join(", ")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default DashboardView;
