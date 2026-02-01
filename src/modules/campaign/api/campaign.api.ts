import type {
  AssignToEmailRequest,
  Campaign,
  CampaignListParams,
  CreateCampaignResponse,
  UpdateCampaignRequest,
} from "@/modules/campaign/types/campaign.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const campaignApi = {
  getCampaigns: async (params: CampaignListParams): Promise<ApiBaseListResponse<Campaign>> => {
    return await http.get(`/campaigns${convertQueryParams(params)}`);
  },

  createCampaigns: async (campaigns: UpdateCampaignRequest[]): Promise<ApiBaseResponse<CreateCampaignResponse>> => {
    return await http.post(`/campaigns`, campaigns);
  },

  importGmail: async (payload: AssignToEmailRequest): Promise<ApiBaseResponse<null>> => {
    return await http.post(`/campaigns/import-gmail`, payload);
  },
};
