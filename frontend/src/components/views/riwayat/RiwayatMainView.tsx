import ProfileLayout from "@/components/layouts/ProfileLayout";
import { Diagnosis } from "@/types/model";
import { formatDateIndo } from "@/utils/helpers";
import { AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export const RiwayatMainView = ({ data }: { data: Diagnosis[] }) => {
  return (
    <ProfileLayout>
      <h1 className="text text-base font-medium tracking-wider">
        Riwayat Diagnosa
      </h1>
      <h3 className="text text-xs text-gray-500">
        Lihat riwayat diagnosa yang telah anda lakukan terhadap kucing anda.
      </h3>
      <div className="mt-4  grid grid-cols-1 lg:grid-cols-2 gap-4">
        {data.length > 0 ? (
          data?.map((item) => (
            <Link
              key={item.id}
              href={`/riwayat/${item.id}`}
              className="min-h-[75px] border border-l-2 border-l-orange-500 p-4"
            >
              <div className="flex text-sm ">
                <p className=" w-[80px]">Tanggal </p>
                <span>: {formatDateIndo(item.createdAt as Date)}</span>
              </div>
              <div className="flex text-sm ">
                <p className=" w-[80px]">penyakit</p>
                <span>: {item?.disease?.map((d) => d.name).join(", ")}</span>
              </div>
              <div className="flex text-sm">
                <p className=" w-[80px]">Kepastian</p>
                <span>: {item.scor}</span>
              </div>
            </Link>
          ))
        ) : (
          <div className="flex items-center col-span-2 mt-16 justify-center h-full flex-col">
            <AlertCircle size={42} strokeWidth={1.5} />
            <span className="ml-2 mt-2 text-sm">
              Tidak ada riwayat diagnosa
            </span>
          </div>
        )}
      </div>
    </ProfileLayout>
  );
};
