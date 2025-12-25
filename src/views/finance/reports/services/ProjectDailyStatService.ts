import { BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'
import {
  GenerateProjectDailyStatRequest,
  ProjectDailyStat,
  ProjectDailyStatFilterRequest,
  ProjectDailyStatResponse,
  UpdateProjectDailyStatRequest,
} from '@/views/finance/reports/types/ProjectDailyStat.type'

export async function apiGetProjectDailyReports(params: ProjectDailyStatFilterRequest) {
  return ApiService.fetchData<ProjectDailyStatResponse>({
    url: '/project-daily-stats',
    method: 'post',
    data: params,
  })
}

export async function apiGenerateProjectDailyReport(payload: GenerateProjectDailyStatRequest) {
  return ApiService.fetchData<BaseResponse<ProjectDailyStat>>({
    url: '/project-daily-stats/generate',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateProjectDailyStat(id: string, payload: UpdateProjectDailyStatRequest) {
  return ApiService.fetchData<BaseResponse<ProjectDailyStat>>({
    url: `/project-daily-stats/${id}`,
    method: 'patch',
    data: payload,
  })
}

export async function apiGetProjectDailyStatById(id: string) {
  return ApiService.fetchData<BaseResponse<ProjectDailyStat>>({
    url: `/project-daily-stats/${id}`,
    method: 'get',
  })
}
