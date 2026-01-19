import { BaseListResponse, BaseResponse, CommonFilterRequest } from '@/@types/common'
import ApiService from '@/services/ApiService'
import { AppealAccount, UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'

export async function apiGetAppealAccountList(params: CommonFilterRequest) {
  return ApiService.fetchData<BaseListResponse<AppealAccount>>({
    url: '/appeal-accounts',
    method: 'get',
    params,
  })
}

export async function apiGetAppealAccountById(id: string) {
  return ApiService.fetchData<BaseResponse<AppealAccount>>({
    url: `/appeal-accounts/${id}`,
    method: 'get',
  })
}

export async function apiCreateAppealAccount(payload: UpdateAppealAccountRequest | UpdateAppealAccountRequest[]) {
  return ApiService.fetchData<BaseResponse<AppealAccount>>({
    url: '/appeal-accounts',
    method: 'post',
    data: payload as any,
  })
}

export async function apiUpdateAppealAccount(id: string, payload: UpdateAppealAccountRequest) {
  return ApiService.fetchData<BaseResponse<AppealAccount>>({
    url: `/appeal-accounts/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteAppealAccount(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/appeal-accounts/${id}`,
    method: 'delete',
  })
}
