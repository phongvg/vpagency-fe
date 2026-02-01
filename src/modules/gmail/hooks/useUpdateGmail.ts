import { gmailApi } from "@/modules/gmail/api/gmail.api";
import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { gmailQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateGmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateGmailRequest }) => gmailApi.updateGmail(id, data),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: gmailQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: gmailQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
