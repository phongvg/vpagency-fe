import { gmailApi } from "@/modules/gmail/api/gmail.api";
import type { UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { gmailQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateGmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateGmailRequest) => gmailApi.createGmail(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: gmailQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
