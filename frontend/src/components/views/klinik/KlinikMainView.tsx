"use client";
import React from "react";
import { Inter } from "next/font/google";
import GoogleMapView from "./GoogleMapView";
import { Libraries, useJsApiLoader } from "@react-google-maps/api";

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
      <h3
        style={inter.style}
        className="text-2xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-semibold"
      >
        <span className="bg-gradient-to-l from-white via-white to-orange-500 px-4 py-1 ">
          Klinik Terdekat
        </span>
      </h3>

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
