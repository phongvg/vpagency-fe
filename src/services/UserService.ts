import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import { UpdateUserInfoPayload, User } from '@/@types/user'
import {
  UpdateUserRequest,
  UserListFilterRequest,
} from '@/views/system/userManagement/types'

export async function apiGetUserInfo() {
  return ApiService.fetchData<BaseResponse<User>>({
    url: '/users/me',
    method: 'get',
  })
}

export async function apiUpdateUserInfo(
  payload: UpdateUserInfoPayload | FormData,
) {
  if (payload instanceof FormData) {
    // Sử dụng BaseService trực tiếp cho FormData
    const { default: BaseService } = await import('./BaseService')
    return BaseService.put<BaseResponse<User>>('/me', payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  }

  // Sử dụng ApiService cho JSON payload
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

export async function apiUpdateUser(
  userId: string,
  payload: UpdateUserRequest,
) {
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
