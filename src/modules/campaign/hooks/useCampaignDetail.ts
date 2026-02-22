import { campaignApi } from "@/modules/campaign/api/campaign.api";
import { campaignQueryKeys } from "@/shared/constants/query-keys.constant";
import { useQuery } from "@tanstack/react-query";

export const useCampaignDetail = (id: string | null) => {
  return useQuery({
    enabled: !!id,
    queryKey: campaignQueryKeys.detail(id as string),
    queryFn: () => campaignApi.getCampaignById(id as string),
    select: (res) => res.data,
  });
};
