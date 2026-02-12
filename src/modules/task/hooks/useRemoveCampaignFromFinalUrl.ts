import type { RemoveFromFinalUrlRequest } from "@/modules/campaign/types/campaign.type";
import { taskApi } from "@/modules/task/api/task.api";
import { taskQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRemoveCampaignFromFinalUrl = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RemoveFromFinalUrlRequest }) => taskApi.removeCampaignsFromFinalUrl(id, payload),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: taskQueryKeys.progress(variables.id) });
      queryClient.invalidateQueries({
        queryKey: [...taskQueryKeys.all, "campaign-stats", variables.id, variables.payload.finalUrlId],
      });
      toast.success(res.message);
    },
  });
};
