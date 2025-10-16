import { BaseListResponse, BaseResponse, CommonFilterRequest } from '@/@types/common'
import { Task, TasksGroupedByStatus } from '@/@types/task'
import ApiService from '@/services/ApiService'

export async function apiGetTasksWithPagination(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Task[]>>({
    url: '/tasks',
    method: 'get',
    params,
  })
}

export async function apiGetTasksGroupedByStatus(assignedUserId?: string) {
  return ApiService.fetchData<BaseResponse<TasksGroupedByStatus>>({
    url: '/tasks/by-status',
    method: 'get',
    params: {
      assignedUserId,
    },
  })
}

export async function apiUpdateTaskStatus(taskId: string, status: string) {
  return ApiService.fetchData<BaseResponse<Task>>({
    url: `/tasks/${taskId}/status`,
    method: 'patch',
    data: { status },
  })
}
