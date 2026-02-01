import type { GmailStatus } from "@/modules/gmailStatus/types/gmailStatus.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse } from "@/shared/types/common/apiResponse.type";

export const gmailStatusApi = {
  getGmailStatuses: (): Promise<ApiBaseListResponse<GmailStatus>> => {
    return http.get("/gmail-statuses");
  },
};
