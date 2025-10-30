import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import { AdsAccount } from '@/@types/adsAccount'
import {
  AdsAccountListFilterRequest,
  CreateAdsAccountRequest,
  UpdateAdsAccountRequest,
} from '@/views/systems/adsAccounts/types'

export async function apiGetAdsAccountList(params: AdsAccountListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AdsAccount>>({
    url: '/ads-accounts',
    method: 'get',
    params,
  })
}

export async function apiGetAdsAccountsByManager(managerId: string, params?: AdsAccountListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AdsAccount>>({
    url: `/ads-accounts/manager/${managerId}`,
    method: 'get',
    params,
  })
}

export async function apiGetAdsAccountsByProject(projectId: string, params?: AdsAccountListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AdsAccount>>({
    url: `/ads-accounts/project/${projectId}`,
    method: 'get',
    params,
  })
}

export async function apiGetAdsAccountById(id: string) {
  return ApiService.fetchData<BaseResponse<AdsAccount>>({
    url: `/ads-accounts/${id}`,
    method: 'get',
  })
}

export async function apiCreateAdsAccount(payload: CreateAdsAccountRequest) {
  return ApiService.fetchData<BaseResponse<AdsAccount>>({
    url: '/ads-accounts',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateAdsAccount(id: string, payload: UpdateAdsAccountRequest) {
  return ApiService.fetchData<BaseResponse<AdsAccount>>({
    url: `/ads-accounts/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteAdsAccount(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/ads-accounts/${id}`,
    method: 'delete',
  })
}
