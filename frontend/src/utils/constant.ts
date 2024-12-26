import { User, Biohazard, SearchCheck, CheckSquare } from "lucide-react";

export const ALLOW_FILE_TYPE = ["image/jpeg", "image/png", "image/jpg"];

export const accordionItems = [
  {
    value: "item-1",
    title: "Metode apa yang digunakan di Catcare?",
    content:
      "Metode yang digunakan di Catcare adalah Metode Forward Chaining. Metode ini digunakan untuk mengekstraksi pengetahuan dari dataset dan membangun model pengetahuan berdasarkan aturan yang telah dikumpulkan oleh pakar.",
  },
  {
    value: "item-3",
    title: "Bagaimana cara kerja metode forward chaining di Catcare?",
    content:
      "Metode forward chaining bekerja dengan memulai dari data awal (fakta-fakta) dan menggunakan aturan-aturan logika untuk menarik kesimpulan hingga mencapai hasil akhir atau tujuan yang diinginkan.",
  },
  {
    value: "item-4",
    title: "Berapa jumlah gejala yang tersedia di Catcare?",
    content:
      "Sistem Catcare memiliki lebih dari 50 gejala yang telah diidentifikasi oleh pakar. Gejala-gejala ini digunakan untuk menganalisis dan menentukan kemungkinan penyakit yang dialami oleh kucing.",
  },
  {
    value: "item-5",
    title: "Penyakit apa yang paling sering terdeteksi oleh Catcare?",
    content:
      "Berdasarkan data sistem, penyakit yang paling sering terdeteksi adalah flu kucing (feline upper respiratory infection) dan penyakit kulit seperti dermatofitosis. Data ini dihasilkan dari analisis banyaknya gejala yang terkait dengan penyakit tersebut.",
  },
  {
    value: "item-6",
    title: "Berapa jumlah penyakit yang dapat dideteksi oleh Catcare?",
    content:
      "Catcare dapat mendeteksi lebih dari 20 jenis penyakit yang umum terjadi pada kucing.",
  },
  {
    value: "item-7",
    title: "Bagaimana akurasi diagnosis di Catcare?",
    content:
      "Akurasi diagnosis di Catcare bergantung pada data yang diberikan oleh pengguna. Dengan input gejala yang tepat, sistem dapat memberikan hasil diagnosis dengan tingkat akurasi hingga 90%.",
  },
  {
    value: "item-8",
    title:
      "Apakah Catcare bisa digunakan untuk mendiagnosis lebih dari satu penyakit?",
    content:
      "Ya, Catcare dapat mendeteksi kemungkinan lebih dari satu penyakit jika gejala yang dimasukkan pengguna terkait dengan beberapa penyakit sekaligus. Sistem akan memberikan daftar penyakit berdasarkan tingkat kemungkinannya.",
  },
  {
    value: "item-9",
    title: "Bagaimana Catcare memperbarui data gejala dan penyakit?",
    content:
      "Data gejala dan penyakit di Catcare diperbarui secara berkala berdasarkan masukan dari pakar dan hasil penelitian terbaru. Hal ini memastikan bahwa sistem selalu relevan dan akurat.",
  },
];

export const TotalDashboard = [
  {
    title: "Pengguna",
    value: "1",
    icon: User,
    color: "bg-orange-500",
    data: "user",
  },
  {
    title: "Penyakit",
    value: "2",
    icon: Biohazard,
    color: "bg-green-500",
    data: "disease",
  },
  {
    title: "Gejala",
    value: "3",
    icon: SearchCheck,
    color: "bg-red-500",
    data: "symptom",
  },
  {
    title: "Diagnosis",
    value: "3",
    icon: CheckSquare,
    color: "bg-blue-500",
    data: "diagnosis",
  },
];
