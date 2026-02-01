import { gmailApi } from "@/modules/gmail/api/gmail.api";
import type { GmailListParams } from "@/modules/gmail/types/gmail.type";
import { gmailQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useGmails = (params: GmailListParams) => {
  return useQuery({
    queryKey: gmailQueryKeys.list(params),
    queryFn: () => gmailApi.getGmails(params),
    select: (res) => res.data,
  });
};
