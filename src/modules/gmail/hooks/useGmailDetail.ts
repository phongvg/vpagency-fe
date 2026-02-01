import { gmailApi } from "@/modules/gmail/api/gmail.api";
import { gmailQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useGmailDetail = (id: string | null) => {
  return useQuery({
    queryKey: gmailQueryKeys.detail(id!),
    queryFn: () => gmailApi.getGmailById(id!),
    select: (res) => res.data,
    enabled: !!id,
  });
};
