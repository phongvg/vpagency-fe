import { finalUrlApi } from "@/modules/finalUrl/api/final-url.api";
import { finalUrlQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useFinalUrl = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: finalUrlQueryKeys.detail(id as string),
    queryFn: () => finalUrlApi.getFinalUrlById(id as string),
    select: (res) => res.data,
  });
};
