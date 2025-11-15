import { BaseListResponse, BaseResponse, CommonFilterRequest } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { Project, UpdateProjectRequest } from '@/views/projects/types/project.type'

export async function apiGetProjectList(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Project>>({
    url: '/projects',
    method: 'get',
    params,
  })
}

export async function apiGetProjectById(projectId: string) {
  return ApiService.fetchData<BaseResponse<Project>>({
    url: `/projects/${projectId}`,
    method: 'get',
  })
}

export async function apiCreateProject(payload: UpdateProjectRequest) {
  return ApiService.fetchData<BaseResponse<Project>>({
    url: '/projects',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateProject(projectId: string, payload: UpdateProjectRequest) {
  return ApiService.fetchData<BaseResponse<Project>>({
    url: `/projects/${projectId}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteProject(projectId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/projects/${projectId}`,
    method: 'delete',
  })
}
