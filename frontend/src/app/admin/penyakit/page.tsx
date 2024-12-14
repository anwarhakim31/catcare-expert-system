import Link from "next/link";
import React from "react";

const PenyakitPage = () => {
  return (
    <section className="px-4 py-8">
      <div className="flex justify-between items-center">
        <h3 className="text-sm">Kelola dan lihat data penyakit</h3>
        <Link href="/admin/penyakit/tambah" className="btn">
          Tambah
        </Link>
      </div>
    </section>
  );
};

export default PenyakitPage;
