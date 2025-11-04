import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import {
  AdsAccountDailyMetric,
  AdsAccountDailyMetricListFilterRequest,
  CreateAdsAccountDailyMetricRequest,
  UpdateAdsAccountDailyMetricRequest,
} from '@/@types/adsAccountDailyMetric'

export async function apiGetDailyMetricList(params: AdsAccountDailyMetricListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AdsAccountDailyMetric>>({
    url: '/ads-account-daily-metrics',
    method: 'get',
    params,
  })
}

export async function apiGetDailyMetricById(id: string) {
  return ApiService.fetchData<BaseResponse<AdsAccountDailyMetric>>({
    url: `/ads-account-daily-metrics/${id}`,
    method: 'get',
  })
}

export async function apiCreateDailyMetric(payload: CreateAdsAccountDailyMetricRequest) {
  return ApiService.fetchData<BaseResponse<AdsAccountDailyMetric>>({
    url: '/ads-account-daily-metrics',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateDailyMetric(id: string, payload: UpdateAdsAccountDailyMetricRequest) {
  return ApiService.fetchData<BaseResponse<AdsAccountDailyMetric>>({
    url: `/ads-account-daily-metrics/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteDailyMetric(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/ads-account-daily-metrics/${id}`,
    method: 'delete',
  })
}

export async function apiGetDailyMetricByAdsAccountId(id: string) {
  return ApiService.fetchData<BaseResponse<AdsAccountDailyMetric>>({
    url: `/ads-account-daily-metrics/ads-account/${id}`,
    method: 'get',
  })
}
