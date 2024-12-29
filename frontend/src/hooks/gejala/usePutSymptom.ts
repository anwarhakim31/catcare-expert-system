import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Symptom } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePutSymptom = (id: string, onClose: () => void) => {
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data: Symptom) => {
      const res = await instance.put("/symptom/" + id, data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah gejala");
      query.invalidateQueries({ queryKey: ["symptom"] });
      onClose();
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePutSymptom;
