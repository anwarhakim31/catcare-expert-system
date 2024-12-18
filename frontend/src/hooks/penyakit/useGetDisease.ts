import instance from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

const useGetDisease = (
  searchParams?: URLSearchParams,
  customPage?: string,
  customLimit?: string
) => {
  const params = new URLSearchParams();
  const search = searchParams?.get("search");
  const page = searchParams?.get("page") || customPage;
  const limit = searchParams?.get("limit") || customLimit;

  if (search) params.set("search", search);
  if (page) params.set("page", page);
  if (limit) params.set("limit", limit);

  return useQuery({
    queryKey: ["disease", { search, page, limit }],
    queryFn: async () => {
      const res = await instance.get(`/disease?${params.toString()}`, {
        withCredentials: true,
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    placeholderData: (oldData) => oldData,
  });
};

export default useGetDisease;
