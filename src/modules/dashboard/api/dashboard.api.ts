import type { MonthlySpendingStats, ProjectStats, TaskStatistic, TopProjectByProfit, UserStatistic } from "@/modules/dashboard/types/dashboard.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const dashboardApi = {
  getUserStats: (): Promise<ApiBaseResponse<UserStatistic>> => {
    return http.get("/admin/users/stats");
  },

  getTaskStats: (): Promise<ApiBaseResponse<TaskStatistic>> => {
    return http.get("/tasks/stats/user");
  },

  getTopProjectsByProfit: (): Promise<ApiBaseResponse<TopProjectByProfit[]>> => {
    return http.get("/dashboard/top-projects-by-profit");
  },

  getMonthlySpendingStats: (): Promise<ApiBaseResponse<MonthlySpendingStats>> => {
    return http.get("/dashboard/monthly-spending");
  },

  getProjectStats: (): Promise<ApiBaseResponse<ProjectStats>> => {
    return http.get("/dashboard/stats");
  },
};
