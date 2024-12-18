import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Rule } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePostRule = (onClose: () => void) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (data: Rule) => {
      const res = await instance.post("/rules", data, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan penyakit");
      onClose();
      query.invalidateQueries({ queryKey: ["rules"] });
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePostRule;
