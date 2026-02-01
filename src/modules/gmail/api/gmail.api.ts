import type { Gmail, GmailListParams, UpdateGmailRequest } from "@/modules/gmail/types/gmail.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const gmailApi = {
  getGmails: (params: GmailListParams): Promise<ApiBaseListResponse<Gmail>> => {
    return http.get(`/gmails${convertQueryParams(params)}`);
  },

  getGmailById: (id: string): Promise<ApiBaseResponse<Gmail>> => {
    return http.get(`/gmails/${id}`);
  },

  createGmail: (data: UpdateGmailRequest): Promise<ApiBaseResponse<Gmail>> => {
    return http.post(`/gmails`, data);
  },

  createGmails: (data: UpdateGmailRequest[]): Promise<ApiBaseResponse<Gmail[]>> => {
    return http.post(`/gmails`, data);
  },

  updateGmail: (id: string, data: UpdateGmailRequest): Promise<ApiBaseResponse<Gmail>> => {
    return http.put(`/gmails/${id}`, data);
  },

  deleteGmail: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/gmails/${id}`);
  },

  assignGmail: (id: string): Promise<ApiBaseResponse<Gmail>> => {
    return http.post(`/gmails/${id}/assign`);
  },
};
