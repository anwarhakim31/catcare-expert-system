import instance from "@/lib/interceptors";
import { useMutation } from "@tanstack/react-query";

const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { username: string; password: string }) => {
      const res = await instance.post("/auth/login", data, {
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useLogin;
