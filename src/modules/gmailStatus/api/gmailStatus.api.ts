import type {
  CreateGmailStatusRequest,
  GmailStatus,
  GmailStatusListParams,
  UpdateGmailStatusRequest,
} from "@/modules/gmailStatus/types/gmailStatus.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const gmailStatusApi = {
  getGmailStatuses: (params: GmailStatusListParams): Promise<ApiBaseListResponse<GmailStatus>> => {
    return http.get(`/gmail-statuses${convertQueryParams(params)}`);
  },

  getGmailStatusById: (id: string): Promise<ApiBaseResponse<GmailStatus>> => {
    return http.get(`/gmail-statuses/${id}`);
  },

  createGmailStatus: (data: CreateGmailStatusRequest): Promise<ApiBaseResponse<GmailStatus>> => {
    return http.post(`/gmail-statuses`, data);
  },

  updateGmailStatus: (id: string, data: UpdateGmailStatusRequest): Promise<ApiBaseResponse<GmailStatus>> => {
    return http.put(`/gmail-statuses/${id}`, data);
  },

  deleteGmailStatus: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/gmail-statuses/${id}`);
  },
};
