import type { Campaign, CampaignListParams } from "@/modules/campaign/types/campaign.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const campaignApi = {
  getCampaigns: async (params: CampaignListParams): Promise<ApiBaseListResponse<Campaign>> => {
    return await http.get(`/campaigns${convertQueryParams(params)}`);
  },
};
