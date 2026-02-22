import { urls } from "@/app/routes/route.constant";
import { campaignApi } from "@/modules/campaign/api/campaign.api";
import type { UpdateCampaignRequest } from "@/modules/campaign/types/campaign.type";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: { id: string; campaign: UpdateCampaignRequest }) => campaignApi.updateCampaign(data.id, data.campaign),
    onSuccess: (res, variables) => {
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.detail(variables.id) });
      queryClient.invalidateQueries({ queryKey: campaignQueryKeys.lists() });
      toast.success(res.message);
      navigate(`/${urls.campaign}`);
    },
  });
};
