import { appealedProxyApi } from "@/modules/appealedProxy/api/appealedProxy.api";
import type { AppealedProxyListParams } from "@/modules/appealedProxy/types/appealedProxy.type";
import { appealedProxyQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useAppealedProxies = (params: AppealedProxyListParams) => {
  return useQuery({
    queryKey: appealedProxyQueryKeys.list(params),
    queryFn: () => appealedProxyApi.getAppealedProxies(params),
    select: (res) => res.data,
  });
};
