import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'
import { AssignToFinalUrlRequest, Campaign, RemoveFromFinalUrlRequest } from '@/views/campaign/types/campaign.type'
import {
  Task,
  TaskProgressDetailResponse,
  TaskProgressRequest,
  TaskProgressResponse,
  TasksFilterRequest,
  TasksGroupedByStatus,
  TaskStatisticResponse,
  UpdateAppealMetricsRequest,
  UpdateDocumentAppealMetricsRequest,
  UpdateResearchMetricsRequest,
  UpdateTaskRequest,
} from '@/views/tasks/assign/types/task.type'

export async function apiGetTasks(params: TasksFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Task>>({
    url: '/tasks',
    method: 'get',
    params,
  })
}

export async function apiGetTasksGroupedByStatus(filterByCurrentUser?: boolean) {
  return ApiService.fetchData<BaseResponse<TasksGroupedByStatus>>({
    url: '/tasks/by-status',
    method: 'get',
    params: filterByCurrentUser ? { filterByCurrentUser: 'true' } : undefined,
  })
}

export async function apiUpdateTaskStatus(taskId: string, status: string) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/status`,
    method: 'patch',
    data: { status },
  })
}

export async function apiGetTaskDetail(taskId: string) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}`,
    method: 'get',
  })
}

export async function apiCreateTask(data: UpdateTaskRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: '/tasks',
    method: 'post',
    data,
  })
}

export async function apiUpdateTask(taskId: string, data: UpdateTaskRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}`,
    method: 'put',
    data,
  })
}

export async function apiDeleteTask(taskId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/tasks/${taskId}`,
    method: 'delete',
  })
}

export async function apiUpdateTaskProgress(taskId: string, payload: TaskProgressRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/progress`,
    method: 'put',
    data: payload,
  })
}

export async function apiGetUserTaskStats() {
  return ApiService.fetchData<BaseResponse<TaskStatisticResponse>>({
    url: '/tasks/stats/user',
    method: 'get',
  })
}

export async function apiGetTaskProgress(taskId: string) {
  return ApiService.fetchData<BaseResponse<TaskProgressResponse>>({
    url: `/tasks/${taskId}/progress`,
    method: 'get',
  })
}

export async function apiAssignCampaignsToFinalUrl(id: string, payload: AssignToFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/tasks/${id}/campaigns/assign`,
    method: 'post',
    data: payload,
  })
}

export async function apiRemoveCampaignsFromFinalUrl(id: string, payload: RemoveFromFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/tasks/${id}/campaigns/remove`,
    method: 'post',
    data: payload,
  })
}

export async function apiGetCampaignStatsByFinalUrl(taskId: string, finalUrlId: string, params: CampaignFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Campaign>>({
    url: `/tasks/${taskId}/final-urls/${finalUrlId}/campaign-stats`,
    method: 'get',
    params,
  })
}

export async function apiGetProgressDetail(taskId: string) {
  return ApiService.fetchData<BaseResponse<TaskProgressDetailResponse>>({
    url: `/tasks/${taskId}/progress/detail`,
    method: 'get',
  })
}

export async function apiUpdateAppealMetrics(taskId: string, payload: UpdateAppealMetricsRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/appeal-details`,
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateDocumentAppealMetrics(taskId: string, payload: UpdateDocumentAppealMetricsRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/document-appeal-details`,
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateResearchMetrics(taskId: string, payload: UpdateResearchMetricsRequest) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/research-details`,
    method: 'post',
    data: payload,
  })
}
