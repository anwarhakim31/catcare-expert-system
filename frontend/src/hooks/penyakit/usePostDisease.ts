import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Disease } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const usePostDisease = () => {
  const router = useRouter();
  const query = useQueryClient();

  return useMutation({
    mutationFn: async (data: Disease) => {
      const res = await instance.post("/disease", data);

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan penyakit");
      router.replace("/admin/penyakit");
      query.invalidateQueries({ queryKey: ["disease"] });
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePostDisease;
