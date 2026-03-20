import type {
  MonthlySpendingStats,
  ProjectStats,
  TaskStatistic,
  TopFinalUrlByCost,
  TopProjectByProfit,
  UserStatistic,
} from "@/modules/dashboard/types/dashboard.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const dashboardApi = {
  getUserStats: (): Promise<ApiBaseResponse<UserStatistic>> => {
    return http.get("/dashboard/user-stats");
  },

  getTaskStats: (): Promise<ApiBaseResponse<TaskStatistic>> => {
    return http.get("/dashboard/task-stats");
  },

  getTopProjectsByProfit: (): Promise<ApiBaseResponse<TopProjectByProfit[]>> => {
    return http.get("/dashboard/top-projects-by-profit");
  },

  getMonthlySpendingStats: (): Promise<ApiBaseResponse<MonthlySpendingStats>> => {
    return http.get("/dashboard/monthly-spending-stats");
  },

  getProjectStats: (): Promise<ApiBaseResponse<ProjectStats>> => {
    return http.get("/dashboard/project-stats");
  },

  getTopFinalUrlsByCost: (): Promise<ApiBaseResponse<TopFinalUrlByCost[]>> => {
    return http.get("/dashboard/top-final-urls-by-cost");
  },
};
