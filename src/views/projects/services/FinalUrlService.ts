import { FinalUrl, UpdateFinalUrlRequest } from '../types/finalUrl.type'
import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'

export async function apiGetFinalUrlList(params: any) {
  return ApiService.fetchData<BaseListResponse<FinalUrl>>({
    url: '/final-urls',
    method: 'get',
    params,
  })
}

export async function apiGetFinalUrlById(id: string) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: `/final-urls/${id}`,
    method: 'get',
  })
}

export async function apiCreateFinalUrl(payload: UpdateFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: '/final-urls',
    method: 'post',
    data: payload,
  })
}

export async function apiUpdateFinalUrl(finalUrlId: string, payload: UpdateFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: `/final-urls/${finalUrlId}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteFinalUrl(finalUrlId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/final-urls/${finalUrlId}`,
    method: 'delete',
  })
}

export async function apiGetFinalUrlByProjectId(projectId: string) {
  return ApiService.fetchData<BaseListResponse<FinalUrl>>({
    url: `/final-urls/project/${projectId}`,
    method: 'get',
  })
}
