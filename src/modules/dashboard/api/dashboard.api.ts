import type { TaskStatistic, UserStatistic } from "@/modules/dashboard/types/dashboard.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseResponse } from "@/shared/types/common/apiResponse.type";

export const dashboardApi = {
  getUserStats: (): Promise<ApiBaseResponse<UserStatistic>> => {
    return http.get("/admin/users/stats");
  },

  getTaskStats: (): Promise<ApiBaseResponse<TaskStatistic>> => {
    return http.get("/tasks/stats/user");
  },
};
