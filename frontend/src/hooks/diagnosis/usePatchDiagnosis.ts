import instance from "@/lib/interceptors";
import { Diagnosis } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const usePatchDiagnosis = (diagnosis: Diagnosis) => {
  return useMutation({
    mutationFn: async (data: Diagnosis) => {
      const res = await instance.patch(`/diagnosis/${diagnosis.id}`, data, {
        withCredentials: true,
      });
      return res.data.data;
    },
  });
};

export default usePatchDiagnosis;
