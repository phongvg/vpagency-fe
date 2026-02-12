import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import type { CreateGmailStatusRequest } from "@/modules/gmailStatus/types/gmailStatus.type";
import { gmailStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateGmailStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGmailStatusRequest) => gmailStatusApi.createGmailStatus(data),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: gmailStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
