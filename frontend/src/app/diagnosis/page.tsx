"use client";
import useFetchSymptom from "@/hooks/gejala/useFetchSymptom";
import React from "react";

const Diagnosis = () => {
  const { data } = useFetchSymptom();
  const [answer, setAnswer] = React.useState([]);
  const [index, setIndex] = React.useState(0);

  console.log(data);
  return (
    <div className="w-full h-screen">
      <h1>Diagnosis</h1>
      <p>{data?.data[index]?.symptom}</p>
    </div>
  );
};

export default Diagnosis;
