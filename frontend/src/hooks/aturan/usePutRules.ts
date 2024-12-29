import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Rule } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePutRules = (id: string, onClose: () => void) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data: Rule) => {
      const res = await instance.put("/rules/" + id, data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah gejala");
      query.invalidateQueries({ queryKey: ["rules"] });
      onClose();
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePutRules;
