import instance from "@/lib/interceptors";
import { useQuery } from "@tanstack/react-query";

const useFetchUser = (
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
    queryKey: ["user", { search, page, limit }],
    queryFn: async () => {
      const res = await instance.get(`/user?${params.toString()}`);
      return res.data;
    },
    staleTime: 0,
    placeholderData: (oldData) => oldData,
  });
};

export default useFetchUser;
