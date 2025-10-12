import { BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import type { LoginResponse, LoginRequest } from '@/@types/auth'

export async function apiLogin(payload: LoginRequest) {
  return ApiService.fetchData<BaseResponse<LoginResponse>>({
    url: '/auth/login',
    method: 'post',
    data: payload,
  })
}

export async function apiLoginTelegram(code: string) {
  return ApiService.fetchData<BaseResponse<LoginResponse>>({
    url: '/auth/telegram',
    method: 'get',
    params: { code },
  })
}

export async function apiLogout() {
  return ApiService.fetchData({
    url: '/auth/logout',
    method: 'post',
  })
}
