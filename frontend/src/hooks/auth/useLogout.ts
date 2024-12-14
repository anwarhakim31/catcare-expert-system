import { useAuthContext } from "@/context/AuthContext";
import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLogout = () => {
  const router = useRouter();
  const context = useAuthContext();
  return useMutation({
    mutationFn: async () => {
      await instance.delete("/auth/logout", {
        withCredentials: true,
      });
    },

    onSuccess: () => {
      router.replace("/login");
      context?.setUserData(null);
    },
    onError: (err) => {
      return ResponseError(err);
    },
  });
};

export default useLogout;
