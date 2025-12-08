import { BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { DashboardMonthlySpendingStat, DashboardProjectStat } from '@/views/dashboard/types/dashboard.type'

export async function apiGetProjectStat() {
  return ApiService.fetchData<BaseResponse<DashboardProjectStat>>({
    url: '/dashboard/stats',
    method: 'get',
  })
}

export async function apiGetMonthlySpendingStat() {
  return ApiService.fetchData<BaseResponse<DashboardMonthlySpendingStat>>({
    url: '/dashboard/monthly-spending',
    method: 'get',
  })
}
