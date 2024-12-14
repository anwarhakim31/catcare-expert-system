import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Disease } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const usePostDisease = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: Disease) => {
      const res = await instance.post("/disease", data, {
        withCredentials: true,
      });

      return res.data;
    },
    onSuccess: () => {
      toast.success("Berhasil menambahkan penyakit");
      router.replace("/admin/penyakit");
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePostDisease;
