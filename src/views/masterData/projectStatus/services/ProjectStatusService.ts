import { BaseListResponse, BaseResponse } from '@/@types/common'
import { ProjectStatus, UpdateProjectStatusRequest } from '@/views/masterData/projectStatus/types/projectStatus.type'
import ApiService from '@/services/ApiService'

export async function apiGetProjectStatusList(params: any) {
  return ApiService.fetchData<BaseListResponse<ProjectStatus>>({
    url: '/project-statuses',
    method: 'get',
    params,
  })
}

export async function apiGetProjectStatusById(id: string) {
  return ApiService.fetchData<BaseResponse<ProjectStatus>>({
    url: `/project-statuses/${id}`,
    method: 'get',
  })
}

export async function apiCreateProjectStatus(payload: UpdateProjectStatusRequest) {
  return ApiService.fetchData<BaseResponse<ProjectStatus>>({
    url: '/project-statuses',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateProjectStatus(id: string, payload: UpdateProjectStatusRequest) {
  return ApiService.fetchData<BaseResponse<ProjectStatus>>({
    url: `/project-statuses/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteProjectStatus(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/project-statuses/${id}`,
    method: 'delete',
  })
}
