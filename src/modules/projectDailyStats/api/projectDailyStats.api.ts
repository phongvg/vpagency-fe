import type {
  FinalUrlDailyStats,
  FinalUrlDailyStatsListParams,
  FinalUrlDailyStatsSummary,
  GenerateProjectDailyStatRequest,
  ProjectDailyStats,
  ProjectDailyStatsListParams,
  ProjectDailyStatsSummary,
  UpdateProjectDailyStatRequest,
} from "@/modules/projectDailyStats/types/projectDailyStats.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const projectDailyStatsApi = {
  getProjectDailyStatsSummary: (params: ProjectDailyStatsListParams): Promise<ApiBaseResponse<ProjectDailyStatsSummary[]>> => {
    return http.post("/project-daily-stats/summary", params);
  },

  getProjectDailyStatsPending: (params: ProjectDailyStatsListParams): Promise<ApiBaseListResponse<ProjectDailyStats>> => {
    return http.post("/project-daily-stats/pending", params);
  },

  getProjectDailyStatsCompleted: (params: ProjectDailyStatsListParams): Promise<ApiBaseListResponse<ProjectDailyStats>> => {
    return http.post("/project-daily-stats/completed", params);
  },

  getFinalUrlDailyStats: (params: FinalUrlDailyStatsListParams): Promise<ApiBaseListResponse<FinalUrlDailyStats>> => {
    return http.post("/project-daily-stats/final-url-stats", params);
  },

  getFinalUrlDailyStatsSummary: (params: FinalUrlDailyStatsListParams): Promise<ApiBaseResponse<FinalUrlDailyStatsSummary[]>> => {
    return http.post("/project-daily-stats/final-url-stats/summary", params);
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
