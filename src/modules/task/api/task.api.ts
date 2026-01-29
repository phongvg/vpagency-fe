import type { Task, TaskListParams, TaskProgress, UpdateTaskRequest } from "@/modules/task/types/task.type";
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

  createTask: (data: UpdateTaskRequest): Promise<ApiBaseResponse<Task>> => {
    return http.post(`/tasks`, data);
  },

  editTask: (id: string, data: UpdateTaskRequest): Promise<ApiBaseResponse<Task>> => {
    return http.put(`/tasks/${id}`, data);
  },

  getTaskProgress: (id: string): Promise<ApiBaseResponse<TaskProgress>> => {
    return http.get(`/tasks/${id}/progress`);
  },

  updateTaskProgress: (id: string, progress: number): Promise<ApiBaseResponse<TaskProgress>> => {
    return http.put(`/tasks/${id}/progress`, { progress });
  },
};
