import React from "react";

import { Inter } from "next/font/google";

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const TentangMainView = () => {
  return (
    <main className="w-full min-h-[calc(100vh-92px)]  py-32">
      <h3
        style={inter.style}
        className="text-3xl  text-gray-900 tracking-wider px-4 text-center mb-4 font-semibold"
      >
        <span className="bg-gradient-to-l from-white via-white to-orange-500 px-4 py-1 ">
          Tentang Kami
        </span>
      </h3>
      <p className="w-full max-w-[700px] mx-auto rounded-tl-lg rounded-tr-lg border-t-2 border-orange-500 mt-20 p-4 border-b-2 ">
        Sistem Pakar Diagnosis Penyakit Kulit Kucing adalah sebuah program
        komputer yang dirancang untuk meniru kemampuan seorang pakar dalam suatu
        bidang tertentu. Sistem pakar merupakan bagian dari kecerdasan buatan
        (Artificial Intelligence, AI) yang fokus pada pengolahan pengetahuan.
        Sistem ini dapat membantu seorang pakar atau pemilik kucing dalam
        menentukan penyakit kulit kucing yang mungkin terjadi pada kucing.
        Metode yang digunakan dalam sistem ini adalah metode forward chaining,
        dimana pengetahuan dan aturan yang telah dikumpulkan oleh pakar
        digunakan untuk membuat solusi, rekomendasi, atau kesimpulan terhadap
        suatu masalah.
      </p>
      <div className="w-full aspect-[2/1] max-h-[400px] overflow-hidden  bg-[url('/tentang.jpg')] mt-28  bg-[position:center_-100px] lg:bg-[position:center_-300px] bg-no-repeat bg-cover"></div>
    </main>
  );
};

export default TentangMainView;
