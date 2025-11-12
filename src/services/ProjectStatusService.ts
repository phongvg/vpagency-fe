import { BaseListResponse, BaseResponse } from '@/@types/common'
import { ProjectStatus } from '@/@types/projectStatus'
import {
  CreateProjectStatusRequest,
  ProjectStatusFilterRequest,
  UpdateProjectStatusRequest,
} from '@/views/masterData/projectStatus/types'
import ApiService from './ApiService'

export async function apiGetProjectStatusList(params: ProjectStatusFilterRequest) {
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

export async function apiCreateProjectStatus(payload: CreateProjectStatusRequest) {
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
