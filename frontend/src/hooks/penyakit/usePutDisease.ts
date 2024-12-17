import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Disease } from "@/types/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const usePutDisease = (id: string) => {
  const router = useRouter();
  const query = useQueryClient();
  return useMutation({
    mutationFn: async (data: Disease) => {
      const res = await instance.put("/disease/" + id, data, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil mengubah penyakit");
      router.replace("/admin/penyakit");
      query.invalidateQueries({ queryKey: ["disease"] });
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePutDisease;
