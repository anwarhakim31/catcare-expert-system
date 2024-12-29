import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useDeleteSymptom = () => {
  return useMutation({
    mutationFn: async (data: { selected: string[] }) => {
      const res = await instance.delete("/symptom", {
        data,
      });

      return res.data;
    },
  });
};

export default useDeleteSymptom;
