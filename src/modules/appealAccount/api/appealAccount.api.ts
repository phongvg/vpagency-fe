import type { AppealAccount, AppealAccountListParams, UpdateAppealAccountRequest } from "@/modules/appealAccount/types/appealAccount.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const appealAccountApi = {
  getAppealAccounts: (params: AppealAccountListParams): Promise<ApiBaseListResponse<AppealAccount>> => {
    return http.get(`/appealed-ads-accounts${convertQueryParams(params)}`);
  },

  getAppealAccountById: (id: string): Promise<ApiBaseResponse<AppealAccount>> => {
    return http.get(`/appealed-ads-accounts/${id}`);
  },

  createAppealAccount: (data: UpdateAppealAccountRequest): Promise<ApiBaseResponse<AppealAccount>> => {
    return http.post(`/appealed-ads-accounts`, data);
  },

  createAppealAccounts: (data: UpdateAppealAccountRequest[]): Promise<ApiBaseResponse<AppealAccount>> => {
    return http.post(`/appealed-ads-accounts`, data);
  },

  updateAppealAccount: (id: string, data: UpdateAppealAccountRequest): Promise<ApiBaseResponse<AppealAccount>> => {
    return http.put(`/appealed-ads-accounts/${id}`, data);
  },

  deleteAppealAccount: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/appealed-ads-accounts/${id}`);
  },
};
