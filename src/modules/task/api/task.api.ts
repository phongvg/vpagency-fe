import type { Task, TaskListParams } from "@/modules/task/types/task.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const taskApi = {
  getTasks: (params: TaskListParams): Promise<ApiBaseListResponse<Task>> => {
    return http.get(`/tasks${convertQueryParams(params)}`);
  },

  getTaskById: (id: string): Promise<ApiBaseResponse<Task>> => {
    return http.get(`/tasks/${id}`);
  },
};
