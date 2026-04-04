import { appealedProxyApi } from "@/modules/appealedProxy/api/appealedProxy.api";
import { appealedProxyQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useAppealedProxyDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: appealedProxyQueryKeys.detail(id!),
    queryFn: () => appealedProxyApi.getAppealedProxyById(id!),
    select: (res) => res.data,
  });
};
