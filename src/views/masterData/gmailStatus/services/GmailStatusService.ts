import { BaseListResponse, BaseResponse, CommonFilterRequest } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { GmailStatus, UpdateGmailStatusRequest } from '@/views/masterData/gmailStatus/types/gmailStatus.type'

export async function apiGetGmailStatusList(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponse<GmailStatus>>({
    url: '/gmail-statuses',
    method: 'get',
    params,
  })
}

export async function apiGetGmailStatusById(id: string) {
  return ApiService.fetchData<BaseResponse<GmailStatus>>({
    url: `/gmail-statuses/${id}`,
    method: 'get',
  })
}

export async function apiCreateGmailStatus(payload: UpdateGmailStatusRequest) {
  return ApiService.fetchData<BaseResponse<GmailStatus>>({
    url: '/gmail-statuses',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateGmailStatus(id: string, payload: UpdateGmailStatusRequest) {
  return ApiService.fetchData<BaseResponse<GmailStatus>>({
    url: `/gmail-statuses/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteGmailStatus(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/gmail-statuses/${id}`,
    method: 'delete',
  })
}
