import { gmailApi } from "@/modules/gmail/api/gmail.api";
import { gmailQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAssignGmail = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => gmailApi.assignGmail(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: gmailQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
