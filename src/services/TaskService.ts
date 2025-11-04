import { BaseListResponse, BaseResponse } from '@/@types/common'
import { Task, TasksGroupedByStatus, TasksFilterRequest, AdsGroupByTaskIdResponse } from '@/@types/task'
import ApiService from '@/services/ApiService'

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

export async function apiCreateTask(data: any) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: '/tasks',
    method: 'post',
    data,
  })
}

export async function apiUpdateTask(taskId: string, data: any) {
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

export async function apiUpdateTaskProgress(taskId: string, progress: number) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/progress`,
    method: 'put',
    data: { progress },
  })
}

export async function apiGetAdsGroupByTaskId(taskId: string) {
  return ApiService.fetchData<BaseResponse<AdsGroupByTaskIdResponse>>({
    url: `/tasks/${taskId}/ads-group`,
    method: 'get',
  })
}
