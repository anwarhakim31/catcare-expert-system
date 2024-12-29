import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useDeleteUser = () => {
  return useMutation({
    mutationFn: async (data: { selected: string[] }) => {
      const res = await instance.delete("/user", {
        data,
      });

      return res.data;
    },
  });
};

export default useDeleteUser;
