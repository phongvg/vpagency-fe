import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import { AdsGroup } from '@/@types/adsGroup'
import {
  AdsGroupListFilterRequest,
  CreateAdsGroupRequest,
  UpdateAdsGroupRequest,
} from '@/views/systems/adsGroups/types'

export async function apiGetAdsGroupList(params: AdsGroupListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AdsGroup>>({
    url: '/ads-groups',
    method: 'get',
    params,
  })
}

export async function apiGetMyAdsGroups() {
  return ApiService.fetchData<BaseResponse<AdsGroup[]>>({
    url: '/ads-groups/my-groups',
    method: 'get',
  })
}

export async function apiGetAdsGroupById(id: string) {
  return ApiService.fetchData<BaseResponse<AdsGroup>>({
    url: `/ads-groups/${id}`,
    method: 'get',
  })
}

export async function apiCreateAdsGroup(payload: CreateAdsGroupRequest) {
  return ApiService.fetchData<BaseResponse<AdsGroup>>({
    url: '/ads-groups',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateAdsGroup(id: string, payload: UpdateAdsGroupRequest) {
  return ApiService.fetchData<BaseResponse<AdsGroup>>({
    url: `/ads-groups/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteAdsGroup(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/ads-groups/${id}`,
    method: 'delete',
  })
}
