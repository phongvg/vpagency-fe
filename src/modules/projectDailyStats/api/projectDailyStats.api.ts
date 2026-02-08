import type {
  GenerateProjectDailyStatRequest,
  ProjectDailyStats,
  ProjectDailyStatsListParams,
  ProjectDailyStatsResponse,
  UpdateProjectDailyStatRequest,
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

  getProjectDailyStatsById: (id: string): Promise<ApiBaseResponse<ProjectDailyStats>> => {
    return http.get(`/project-daily-stats/${id}`);
  },

  updateProjectDailyStats: (id: string, payload: UpdateProjectDailyStatRequest): Promise<ApiBaseResponse<ProjectDailyStats>> => {
    return http.patch(`/project-daily-stats/${id}`, payload);
  },

  deleteProjectDailyReport: (id: string): Promise<ApiBaseResponse<null>> => {
    return http.delete(`/project-daily-stats/${id}`);
  },
};
