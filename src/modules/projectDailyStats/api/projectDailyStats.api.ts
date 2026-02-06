import type {
  GenerateProjectDailyStatRequest,
  ProjectDailyStats,
  ProjectDailyStatsListParams,
  ProjectDailyStatsResponse,
} from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const projectDailyStatsApi = {
  getProjectDailyStats: (params: ProjectDailyStatsListParams): Promise<ProjectDailyStatsResponse> => {
    return http.post("/project-daily-stats", params);
  },

  generateProjectDailyStats: (payload: GenerateProjectDailyStatRequest): Promise<ApiBaseResponse<ProjectDailyStats>> => {
    return http.post("/project-daily-stats/generate", payload);
  },
};
