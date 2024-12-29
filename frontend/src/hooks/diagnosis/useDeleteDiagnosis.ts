import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useDeleteDiagnosis = () => {
  return useMutation({
    mutationFn: async (data: { selected: string[] }) => {
      const res = await instance.delete("/diagnosis", {
        data,
      });

      return res.data;
    },
  });
};

export default useDeleteDiagnosis;
