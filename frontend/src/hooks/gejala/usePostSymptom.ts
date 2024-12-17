import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Symptom } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const usePostSymptom = (onClose: () => void) => {
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (data: Symptom) => {
      const res = await instance.post("/symptom", data, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan penyakit");
      onClose();
      query.invalidateQueries({ queryKey: ["symptom"] });
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePostSymptom;
