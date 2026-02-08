import type { FinalUrl } from "@/modules/finalUrl/types/finalUrl.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const finalUrlApi = {
  getFinalUrlsByProjectId: async (projectId: string): Promise<ApiBaseListResponse<FinalUrl>> => {
    return await http.get(`/final-urls/project/${projectId}`);
  },

  getFinalUrlById: async (finalUrlId: string): Promise<ApiBaseResponse<FinalUrl>> => {
    return await http.get(`/final-urls/${finalUrlId}`);
  },
};
