import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { User } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePutUser = (onClose: () => void) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data: User) => {
      const res = await instance.put("/user", data, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah data pengguna");
      query.invalidateQueries({ queryKey: ["user"] });
      onClose();
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePutUser;
