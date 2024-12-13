import instance from "@/lib/interceptors";
import { User } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const useRegister = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      const res = await instance.post("/auth/register", data, {
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useRegister;
