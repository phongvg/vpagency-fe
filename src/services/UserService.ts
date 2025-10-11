import { BaseResponse } from '@/@types/common'
import ApiService from './ApiService'
import { UpdateUserInfoPayload, UserInfoResponse } from '@/@types/user'

export async function apiGetUserInfo() {
  return ApiService.fetchData<BaseResponse<UserInfoResponse>>({
    url: '/users/me',
    method: 'get',
  })
}

export async function apiUpdateUserInfo(payload: UpdateUserInfoPayload) {
  return ApiService.fetchData<BaseResponse<UserInfoResponse>>({
    url: '/users/me',
    method: 'put',
    data: payload,
  })
}
