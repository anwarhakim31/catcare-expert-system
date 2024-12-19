import { Diagnosis } from "@/types/model";

import React, { useEffect } from "react";

import { useRouter } from "next/navigation";

const useCountdown = (diagnosis: Diagnosis) => {
  const [countdown, setCountdown] = React.useState("00 : 00 : 00");
  const router = useRouter();

  useEffect(() => {
    const expiredDate = new Date(diagnosis.expired * 1000);

    const updateCountdown = () => {
      const now = new Date();
      const remainingTime = expiredDate.getTime() - now.getTime();

      if (remainingTime <= 0) {
        router.refresh();
        setCountdown("00 : 00 : 00");
        return;
      }

      const hours = Math.floor(remainingTime / (1000 * 60 * 60));
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

      const formattedTime = [
        hours.toString().padStart(2, "0"),
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(" : ");

      setCountdown(formattedTime);
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [diagnosis.expired, router]);

  return countdown;
};

export default useCountdown;
