import instance from "@/lib/interceptors";

import { useMutation } from "@tanstack/react-query";

const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: {
      password: string;
      newPassword: string;
      confPassword: string;
    }) => {
      const res = await instance.patch("/user/password", data, {
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useChangePassword;
