import instance from "@/lib/interceptors";
import { User } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const useForget = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      await instance.patch("/auth/forget-password", data);
    },
  });
};

export default useForget;
