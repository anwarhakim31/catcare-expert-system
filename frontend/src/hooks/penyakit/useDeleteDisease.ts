import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useDeleteDisease = () => {
  return useMutation({
    mutationFn: async (data: { selected: string[] }) => {
      const res = await instance.delete("/disease", {
        data,
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useDeleteDisease;
