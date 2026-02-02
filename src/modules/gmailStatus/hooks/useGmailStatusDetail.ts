import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import { gmailStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useGmailStatusDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: gmailStatusQueryKeys.detail(id!),
    queryFn: () => gmailStatusApi.getGmailStatusById(id!),
    select: (res) => res.data,
  });
};
