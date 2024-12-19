import instance from "@/lib/interceptors";
import { ResponseError } from "@/lib/ResponseError";
import { Diagnosis } from "@/types/model";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const usePostDiagnosis = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      const res = await instance.post(
        "/diagnosis",
        {},
        {
          withCredentials: true,
        }
      );

      return res.data.data;
    },
    onSuccess: (data: Diagnosis) => {
      router.push(`/diagnosis/${data.id}`);
    },
    onError: (err) => {
      ResponseError(err);
    },
  });
};

export default usePostDiagnosis;
