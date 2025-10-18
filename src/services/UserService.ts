import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import { ResetPasswordResponse, UpdateUserInfoPayload, User } from '@/@types/user'
import { ResetPasswordUserRequest, UpdateUserRequest, UserListFilterRequest } from '@/views/systems/users/types'

export async function apiGetUserInfo() {
  return ApiService.fetchData<BaseResponse<User>>({
    url: '/users/me',
    method: 'get',
  })
}

export async function apiUpdateUserInfo(payload: UpdateUserInfoPayload | FormData) {
  if (payload instanceof FormData) {
    const { default: BaseService } = await import('./BaseService')
    return BaseService.put<BaseResponse<User>>('/me', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  return ApiService.fetchData<BaseResponse<User>>({
    url: '/me',
    method: 'put',
    data: payload,
  })
}

export async function apiGetUserList(params: UserListFilterRequest) {
  return ApiService.fetchData<BaseListResponse<User>>({
    url: '/admin/users',
    method: 'get',
    params,
  })
}

export async function apiUpdateUser(userId: string, payload: UpdateUserRequest) {
  return ApiService.fetchData<BaseResponse<User>>({
    url: `/admin/users/${userId}`,
    method: 'put',
    data: payload,
  })
}

export async function apiUpdateStatusUser(userId: string) {
  return ApiService.fetchData<BaseResponse<User>>({
    url: `/admin/users/${userId}/toggle-status`,
    method: 'post',
  })
}

export async function apiResetPasswordUser(userId: string, payload: ResetPasswordUserRequest) {
  return ApiService.fetchData<BaseResponse<ResetPasswordResponse>>({
    url: `/admin/users/${userId}/reset-password`,
    method: 'post',
    data: payload,
  })
}
