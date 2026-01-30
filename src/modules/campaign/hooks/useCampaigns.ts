import { campaignApi } from "@/modules/campaign/api/campaign.api";
import type { CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useCampaigns = (params: CampaignListParams) => {
  return useQuery({
    queryKey: campaignQueryKeys.list(params),
    queryFn: () => campaignApi.getCampaigns(params),
    select: (data) => data.data,
  });
};
