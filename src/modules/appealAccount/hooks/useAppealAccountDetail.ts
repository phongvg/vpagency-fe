import { appealAccountApi } from "@/modules/appealAccount/api/appealAccount.api";
import { appealAccountQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useAppealAccountDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: appealAccountQueryKeys.detail(id!),
    queryFn: () => appealAccountApi.getAppealAccountById(id!),
    select: (res) => res.data,
  });
};
