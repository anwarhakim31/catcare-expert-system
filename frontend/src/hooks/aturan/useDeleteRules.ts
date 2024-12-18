import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useDeleteRules = () => {
  return useMutation({
    mutationFn: async (data: { selected: string[] }) => {
      const res = await instance.delete("/rules", {
        data,
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useDeleteRules;
