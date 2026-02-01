import type { AssignToFinalUrlRequest } from "@/modules/campaign/types/campaign.type";
import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useAssignCampaignToFinalUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AssignToFinalUrlRequest }) => taskApi.assignCampaignToFinalUrl(id, payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(variables.id) });
      queryClient.invalidateQueries({
        queryKey: [...taskQueryKeys.all, "campaign-stats", variables.id, variables.payload.finalUrlId],
      });
      toast.success(res.message);
    },
  });
};
