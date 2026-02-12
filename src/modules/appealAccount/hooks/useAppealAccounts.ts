import { appealAccountApi } from "@/modules/appealAccount/api/appealAccount.api";
import type { AppealAccountListParams } from "@/modules/appealAccount/types/appealAccount.type";
import { appealAccountQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useAppealAccounts = (params: AppealAccountListParams) => {
  return useQuery({
    queryKey: appealAccountQueryKeys.list(params),
    queryFn: () => appealAccountApi.getAppealAccounts(params),
    select: (res) => res.data,
  });
};
