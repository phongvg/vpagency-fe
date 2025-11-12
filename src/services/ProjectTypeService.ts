import { BaseListResponse, BaseResponse } from '@/@types/common'
import { ProjectType } from '@/@types/projectType'
import {
  CreateProjectTypeRequest,
  ProjectTypeFilterRequest,
  UpdateProjectTypeRequest,
} from '@/views/masterData/projectType/types'
import ApiService from './ApiService'

export async function apiGetProjectTypeList(params: ProjectTypeFilterRequest) {
  return ApiService.fetchData<BaseListResponse<ProjectType>>({
    url: '/project-types',
    method: 'get',
    params,
  })
}

export async function apiGetProjectTypeById(id: string) {
  return ApiService.fetchData<BaseResponse<ProjectType>>({
    url: `/project-types/${id}`,
    method: 'get',
  })
}

export async function apiCreateProjectType(payload: CreateProjectTypeRequest) {
  return ApiService.fetchData<BaseResponse<ProjectType>>({
    url: '/project-types',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateProjectType(id: string, payload: UpdateProjectTypeRequest) {
  return ApiService.fetchData<BaseResponse<ProjectType>>({
    url: `/project-types/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteProjectType(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/project-types/${id}`,
    method: 'delete',
  })
}
