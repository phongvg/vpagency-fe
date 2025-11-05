import { BaseListResponse, BaseResponse } from '@/@types/common'
import { FinanceStats, ProjectReports, ProjectReportsFilterRequest } from '@/@types/statistic'
import ApiService from '@/services/ApiService'

export async function apiGetProjectReportsStats(params: ProjectReportsFilterRequest) {
  return ApiService.fetchData<BaseListResponse<ProjectReports>>({
    url: '/finance/project-reports',
    method: 'get',
    params,
  })
}

export async function apiGetFinanceStats() {
  return ApiService.fetchData<BaseResponse<FinanceStats>>({
    url: '/finance/stats',
    method: 'get',
  })
}
