import type { AssignToFinalUrlRequest, Campaign, CampaignListParams, RemoveFromFinalUrlRequest } from "@/modules/campaign/types/campaign.type";
import type { Task, TaskListParams, TaskProgress, TasksGroupedByStatus, UpdateTaskRequest } from "@/modules/task/types/task.type";
import { http } from "@/shared/libs/http";
import type { ApiBaseListResponse, ApiBaseResponse } from "@/shared/types/common/apiResponse.type";
import { convertQueryParams } from "@/shared/utils/common.util";

export const taskApi = {
  getTasks: (params: TaskListParams): Promise<ApiBaseListResponse<Task>> => {
    return http.get(`/tasks${convertQueryParams(params)}`);
  },

  getTasksByStatus: (): Promise<ApiBaseResponse<TasksGroupedByStatus>> => {
    return http.get("/tasks/by-status");
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

  updateTaskStatus: (id: string, status: string): Promise<ApiBaseResponse<Task>> => {
    return http.patch(`/tasks/${id}/status`, { status });
  },

  updateTaskProgress: (id: string, progress: number): Promise<ApiBaseResponse<TaskProgress>> => {
    return http.put(`/tasks/${id}/progress`, { progress });
  },

  getCampaignStatsByFinalUrl: ({
    taskId,
    finalUrlId,
    params,
  }: {
    taskId: string;
    finalUrlId: string;
    params: CampaignListParams;
  }): Promise<ApiBaseListResponse<Campaign>> => {
    return http.get(`/tasks/${taskId}/final-urls/${finalUrlId}/campaign-stats${convertQueryParams(params)}`);
  },

  assignCampaignToFinalUrl: (id: string, payload: AssignToFinalUrlRequest): Promise<ApiBaseResponse<null>> => {
    return http.post(`/tasks/${id}/campaigns/assign`, payload);
  },

  removeCampaignsFromFinalUrl: (id: string, payload: RemoveFromFinalUrlRequest): Promise<ApiBaseResponse<null>> => {
    return http.post(`/tasks/${id}/campaigns/remove`, payload);
  },
};
