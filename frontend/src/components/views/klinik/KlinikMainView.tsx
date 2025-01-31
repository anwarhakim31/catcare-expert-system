"use client";
import React from "react";
import { Inter } from "next/font/google";
import GoogleMapView from "./GoogleMapView";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";
import { Badge } from "@/components/ui/badge";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const KlinikMainView = () => {
  const libRef = React.useRef<Libraries>(["places"]);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
    libraries: libRef.current,
  });

  return (
    <main className="w-full min-h-[calc(100vh-92px)] container py-32">
      <Badge
        variant="primary"
        className="capitalize flex items-center justify-center w-[100px] mx-auto mb-1"
      >
        Klinik
      </Badge>
      <h3
        style={inter.style}
        className="text-3xl  text-gray-900 tracking-wider px-4 text-center font-semibold"
      >
        Klinik Hewan
      </h3>
      <p className="text-gray-600 text-center text-sm mt-4 font-medium">
        Cari klinik hewan terdekat di sekitarmu
      </p>

      <div className=" relative mt-20 rounded-md overflow-hidden">
        {!isLoaded ? (
          <div className="w-full h-[calc(100vh-100px)] flex justify-center mt-20 items-center bg-gray-100">
            <p className="text-orange-500">Loading map...</p>
          </div>
        ) : (
          <GoogleMapView />
        )}
      </div>
    </main>
  );
};

export default KlinikMainView;
