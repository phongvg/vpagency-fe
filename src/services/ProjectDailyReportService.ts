import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import {
  ProjectDailyReport,
  ProjectDailyReportListFilterRequest,
  CreateProjectDailyReportRequest,
  UpdateProjectDailyReportRequest,
} from '@/@types/projectDailyReport'

export async function apiGetProjectDailyReportList(params: ProjectDailyReportListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<ProjectDailyReport>>({
    url: '/project-daily-reports',
    method: 'get',
    params,
  })
}

export async function apiGetProjectDailyReportById(id: string) {
  return ApiService.fetchData<BaseResponse<ProjectDailyReport>>({
    url: `/project-daily-reports/${id}`,
    method: 'get',
  })
}

export async function apiCreateProjectDailyReport(payload: CreateProjectDailyReportRequest) {
  return ApiService.fetchData<BaseResponse<ProjectDailyReport>>({
    url: '/project-daily-reports',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateProjectDailyReport(id: string, payload: UpdateProjectDailyReportRequest) {
  return ApiService.fetchData<BaseResponse<ProjectDailyReport>>({
    url: `/project-daily-reports/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteProjectDailyReport(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/project-daily-reports/${id}`,
    method: 'delete',
  })
}
