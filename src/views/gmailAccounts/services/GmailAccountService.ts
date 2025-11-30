import { BaseListResponse, BaseListResponseWithoutPagination, BaseResponse, CommonFilterRequest } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { GmailAccount, UpdateGmailAccountRequest } from '@/views/gmailAccounts/types/gmailAccount.type'

export async function apiGetGmailAccountList(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponse<GmailAccount>>({
    url: '/gmails',
    method: 'get',
    params,
  })
}

export async function apiGetGmailAccountById(id: string) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: `/gmails/${id}`,
    method: 'get',
  })
}

export async function apiCreateGmailAccount(payload: UpdateGmailAccountRequest | UpdateGmailAccountRequest[]) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: '/gmails',
    method: 'post',
    data: payload as any,
  })
}

export async function apiUpdateGmailAccount(id: string, payload: UpdateGmailAccountRequest) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: `/gmails/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteGmailAccount(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/gmails/${id}`,
    method: 'delete',
  })
}

export async function apiAssignGmailAccountToSelf(id: string) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: `/gmails/${id}/assign`,
    method: 'post',
  })
}

export async function apiGetMyGmails(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponseWithoutPagination<GmailAccount>>({
    url: '/gmails/my-gmails',
    method: 'post',
    params,
  })
}
