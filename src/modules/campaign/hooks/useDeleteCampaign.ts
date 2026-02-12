import { campaignApi } from "@/modules/campaign/api/campaign.api";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => campaignApi.deleteCampaign(id),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
