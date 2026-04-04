import type {
  AppealedProxy,
  AppealedProxyListParams,
  CreateAppealedProxyRequest,
  UpdateAppealedProxyRequest,
} from "@/modules/appealedProxy/types/appealedProxy.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const appealedProxyApi = {
  getAppealedProxies: (params: AppealedProxyListParams): Promise<ApiBaseListResponse<AppealedProxy>> => {
    return http.get(`/appealed-proxy${convertQueryParams(params)}`);
  },

  getAppealedProxyById: (id: string): Promise<ApiBaseResponse<AppealedProxy>> => {
    return http.get(`/appealed-proxy/${id}`);
  },

  createAppealedProxy: (data: CreateAppealedProxyRequest): Promise<ApiBaseResponse<AppealedProxy>> => {
    return http.post(`/appealed-proxy`, data);
  },

  createAppealedProxies: (data: CreateAppealedProxyRequest[]): Promise<ApiBaseResponse<AppealedProxy>> => {
    return http.post(`/appealed-proxy`, data);
  },

  updateAppealedProxy: (id: string, data: UpdateAppealedProxyRequest): Promise<ApiBaseResponse<AppealedProxy>> => {
    return http.put(`/appealed-proxy/${id}`, data);
  },

  deleteAppealedProxy: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/appealed-proxy/${id}`);
  },
};
