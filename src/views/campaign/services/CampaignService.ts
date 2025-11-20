import { Campaign, CreateCampaignResponse, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { BaseListResponse, BaseResponse, CommonFilterRequest } from '@/@types/common'
import ApiService from '@/services/ApiService'

export async function apiGetCampaignList(params: CommonFilterRequest) {
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
