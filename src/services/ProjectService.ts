import { BaseListResponse, BaseResponse } from '@/@types/common'
import { Project } from '@/@types/project'
import ApiService from './ApiService'
import { CreateProjectRequest, ProjectListFilterRequest, UpdateProjectRequest } from '@/views/systems/projects/types'

export async function apiGetProjectList(params: ProjectListFilterRequest) {
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

export async function apiCreateProject(payload: CreateProjectRequest) {
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

export async function apiGetProjectsByOwner(ownerId: string, params: ProjectListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Project>>({
    url: `/projects/owner/${ownerId}`,
    method: 'get',
    params,
  })
}
