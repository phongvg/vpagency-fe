import { campaignApi } from "@/modules/campaign/api/campaign.api";
import type { UpdateCampaignRequest } from "@/modules/campaign/types/campaign.type";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useCreateCampaigns = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (campaigns: UpdateCampaignRequest[]) => campaignApi.createCampaigns(campaigns),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success(res.message);
    },
  });
};
