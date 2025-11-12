import { BaseListResponse, BaseResponse } from '@/@types/common'
import { UidStatus } from '@/@types/uidStatus'
import {
  CreateUidStatusRequest,
  UidStatusFilterRequest,
  UpdateUidStatusRequest,
} from '@/views/masterData/uidStatus/types'
import ApiService from './ApiService'

export async function apiGetUidStatusList(params: UidStatusFilterRequest) {
  return ApiService.fetchData<BaseListResponse<UidStatus>>({
    url: '/uid-types',
    method: 'get',
    params,
  })
}

export async function apiGetUidStatusById(id: string) {
  return ApiService.fetchData<BaseResponse<UidStatus>>({
    url: `/uid-types/${id}`,
    method: 'get',
  })
}

export async function apiCreateUidStatus(payload: CreateUidStatusRequest) {
  return ApiService.fetchData<BaseResponse<UidStatus>>({
    url: '/uid-types',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateUidStatus(id: string, payload: UpdateUidStatusRequest) {
  return ApiService.fetchData<BaseResponse<UidStatus>>({
    url: `/uid-types/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteUidStatus(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/uid-types/${id}`,
    method: 'delete',
  })
}
