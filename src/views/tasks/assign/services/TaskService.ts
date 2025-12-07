import { BaseListResponse, BaseResponse } from '@/@types/common'
import {
  Task,
  TasksGroupedByStatus,
  TasksFilterRequest,
  TaskStatisticResponse,
  UpdateTaskRequest,
  TaskProgressResponse,
  TaskProgressRequest,
} from '@/views/tasks/assign/types/task.type'
import ApiService from '@/services/ApiService'
import { AssignToFinalUrlRequest, RemoveFromFinalUrlRequest } from '@/views/campaign/types/campaign.type'

export async function apiGetTasks(params: TasksFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Task>>({
    url: '/tasks',
    method: 'get',
    params,
  })
}

export async function apiGetTasksGroupedByStatus() {
  return ApiService.fetchData<BaseResponse<TasksGroupedByStatus>>({
    url: '/tasks/by-status',
    method: 'get',
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
