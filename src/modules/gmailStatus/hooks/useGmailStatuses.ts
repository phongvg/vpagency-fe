import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import type { GmailStatusListParams } from "@/modules/gmailStatus/types/gmailStatus.type";
import { gmailStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useGmailStatuses = (params: GmailStatusListParams) => {
  return useQuery({
    queryKey: gmailStatusQueryKeys.list(params),
    queryFn: () => gmailStatusApi.getGmailStatuses(params),
    select: (res) => res.data,
  });
};
