import {
  AssignToFinalUrlRequest,
  Campaign,
  CreateCampaignResponse,
  RemoveFromFinalUrlRequest,
  UpdateCampaignRequest,
} from '@/views/campaign/types/campaign.type'
import { BaseListResponse, BaseResponse } from '@/@types/common'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'
import ApiService from '@/services/ApiService'

export async function apiGetCampaignList(params: CampaignFilterRequest) {
  return ApiService.fetchData<BaseListResponse<Campaign>>({
    url: '/campaigns',
    method: 'get',
    params,
  })
}

export async function apiGetCampaignById(id: string) {
  return ApiService.fetchData<BaseResponse<Campaign>>({
    url: `/campaigns/${id}`,
    method: 'get',
  })
}

export async function apiCreateCampaign(payload: UpdateCampaignRequest | UpdateCampaignRequest[]) {
  return ApiService.fetchData<BaseResponse<CreateCampaignResponse>>({
    url: '/campaigns',
    method: 'post',
    data: payload as any,
  })
}

export async function apiUpdateCampaign(campaignId: string, payload: UpdateCampaignRequest) {
  return ApiService.fetchData<BaseResponse<Campaign>>({
    url: `/campaigns/${campaignId}`,
    method: 'put',
    data: payload,
  })
}

export async function apiDeleteCampaign(campaignId: string) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: `/campaigns/${campaignId}`,
    method: 'delete',
  })
}

export async function apiGetCampaignsByDate(date: string) {
  return ApiService.fetchData<BaseListResponse<string>>({
    url: '/campaigns/by-date',
    method: 'get',
    params: {
      date,
    },
  })
}

export async function apiGetCampaignsByDateAndUid(date: string, uid: string) {
  return ApiService.fetchData<BaseListResponse<{ id: string; name: string }>>({
    url: '/campaigns/by-date-and-uid',
    method: 'get',
    params: {
      date,
      uid,
    },
  })
}

export async function apiAssignCampaignsToFinalUrl(payload: AssignToFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: '/campaigns/assign-to-final-url',
    method: 'post',
    data: payload,
  })
}

export async function apiRemoveCampaignsFromFinalUrl(payload: RemoveFromFinalUrlRequest) {
  return ApiService.fetchData<BaseResponse<null>>({
    url: '/campaigns/remove-from-final-url',
    method: 'post',
    data: payload,
  })
}
