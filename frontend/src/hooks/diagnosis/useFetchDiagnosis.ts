import instance from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

const useFetchDiagnosis = (
  searchParams?: URLSearchParams,
  customPage?: string,
  customLimit?: string
) => {
  const params = new URLSearchParams();
  const search = searchParams?.get("search");
  const page = searchParams?.get("page") || customPage;
  const limit = searchParams?.get("limit") || customLimit;
  const status = searchParams?.get("status");

  if (search) params.set("search", search);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);
  if (status) params.set("status", status);

  return useQuery({
    queryKey: ["diagnosis", { search, page, limit, status }],
    queryFn: async () => {
      const res = await instance.get(`/diagnosis?${params.toString()}`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });
};

export default useFetchDiagnosis;
