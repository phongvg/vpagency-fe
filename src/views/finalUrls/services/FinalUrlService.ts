import { FinalUrl, UpdateFinalUrlRequest } from '../types/finalUrl.type'
import { BaseListResponse, BaseResponse } from '@/@types/common'
import ApiService from '@/services/ApiService'

// GET List - Với pagination và filter
export async function apiGetFinalUrlList(params: any) {
  return ApiService.fetchData<BaseListResponse<FinalUrl>>({
    url: '/final-urls',
    method: 'get',
    params,
  })
}

// GET Detail - Lấy một item theo ID
export async function apiGetFinalUrlById(id: string) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: `/final-urls/${id}`,
    method: 'get',
  })
}

// POST Create - Tạo mới
export async function apiCreateFinalUrl(payload: UpdateFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: '/final-urls',
    method: 'post',
    data: payload,
  })
}

// PUT Update - Cập nhật
export async function apiUpdateFinalUrl(finalUrlId: string, payload: UpdateFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<FinalUrl>>({
    url: `/final-urls/${finalUrlId}`,
    method: 'put',
    data: payload,
  })
}

// DELETE - Xóa
export async function apiDeleteFinalUrl(finalUrlId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/final-urls/${finalUrlId}`,
    method: 'delete',
  })
}
