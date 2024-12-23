import instance from "@/lib/interceptors";
import { User } from "@/types/model";
import { useMutation } from "@tanstack/react-query";

const useEditProfile = () => {
  return useMutation({
    mutationFn: async (data: User) => {
      const res = await instance.patch("/user/profile", data, {
        withCredentials: true,
      });

      return res.data;
    },
  });
};

export default useEditProfile;
