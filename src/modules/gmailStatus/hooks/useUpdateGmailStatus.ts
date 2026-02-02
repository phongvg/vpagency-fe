import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import type { UpdateGmailStatusRequest } from "@/modules/gmailStatus/types/gmailStatus.type";
import { gmailStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useUpdateGmailStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { id: string; payload: UpdateGmailStatusRequest }) => gmailStatusApi.updateGmailStatus(data.id, data.payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: gmailStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
