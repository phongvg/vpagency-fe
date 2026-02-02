import { gmailStatusApi } from "@/modules/gmailStatus/api/gmailStatus.api";
import { gmailStatusQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useDeleteGmailStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gmailStatusApi.deleteGmailStatus(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: gmailStatusQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
