import { BaseListResponse, BaseResponse } from '@/@types/common'
import { GmailAccount } from '@/@types/gmailAccount'
import {
  CreateGmailAccountRequest,
  GmailAccountFilterRequest,
  UpdateGmailAccountRequest,
} from '@/views/gmailAccounts/types'
import ApiService from './ApiService'

export async function apiGetGmailAccountList(params: GmailAccountFilterRequest) {
  return ApiService.fetchData<BaseListResponse<GmailAccount>>({
    url: '/gmail-accounts',
    method: 'get',
    params,
  })
}

export async function apiGetMyGmailAccounts() {
  return ApiService.fetchData<BaseResponse<GmailAccount[]>>({
    url: '/ads-groups/my-groups',
    method: 'get',
  })
}

export async function apiGetGmailAccountById(id: string) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: `/ads-groups/${id}`,
    method: 'get',
  })
}

export async function apiCreateGmailAccount(payload: CreateGmailAccountRequest) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: '/ads-groups',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateGmailAccount(id: string, payload: UpdateGmailAccountRequest) {
  return ApiService.fetchData<BaseResponse<GmailAccount>>({
    url: `/ads-groups/${id}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteGmailAccount(id: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/ads-groups/${id}`,
    method: 'delete',
  })
}
