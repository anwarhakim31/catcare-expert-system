import useCountdown from "@/hooks/diagnosis/useCountdown";

import { Diagnosis } from "@/types/model";
import { AlarmClock } from "lucide-react";
import React from "react";

const CountdownFragment = ({ diagnosis }: { diagnosis: Diagnosis }) => {
  const countdown = useCountdown(diagnosis);
  return (
    <div className="flex gap-4 items-center justify-center">
      <p className="text-lg w-[95px] font-medium">{countdown}</p>
      <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
        <AlarmClock size={20} strokeWidth={1.5} />
      </div>
    </div>
  );
};

export default CountdownFragment;
