import { BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import type {
  SignUpCredential,
  ForgotPassword,
  ResetPassword,
  SignUpResponse,
  LoginResponse,
  LoginPayload,
  RefreshTokenResponse,
} from '@/@types/auth'

export async function apiLogin(payload: LoginPayload) {
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

export async function apiSignUp(data: SignUpCredential) {
  return ApiService.fetchData<SignUpResponse>({
    url: '/sign-up',
    method: 'post',
    data,
  })
}

export async function apiLogout() {
  return ApiService.fetchData({
    url: '/auth/logout',
    method: 'post',
  })
}

export async function apiForgotPassword(data: ForgotPassword) {
  return ApiService.fetchData({
    url: '/forgot-password',
    method: 'post',
    data,
  })
}

export async function apiResetPassword(data: ResetPassword) {
  return ApiService.fetchData({
    url: '/reset-password',
    method: 'post',
    data,
  })
}

export async function apiRefreshToken() {
  return ApiService.fetchData<BaseResponse<RefreshTokenResponse>>({
    url: '/auth/refresh',
    method: 'post',
  })
}
