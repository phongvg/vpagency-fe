import { ApiAxiosError } from '@/@types/apiError'
import { removeDash } from '@/helpers/removeDash'
import { GET_CAMPAIGN_DETAIL, GET_CAMPAIGN_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import {
  apiCreateCampaign,
  apiDeleteCampaign,
  apiGetCampaignById,
  apiGetCampaignList,
  apiGetCampaignsByDate,
  apiGetCampaignsByDateAndUid,
  apiUpdateCampaign,
} from '@/views/campaign/services/CampaignService'
import { useCampaignStore } from '@/views/campaign/store/useCampaignStore'
import { UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetCampaignsQuery = (enabled = true) => {
  const { filter } = useCampaignStore()

  return useQuery({
    queryKey: [GET_CAMPAIGN_LIST, filter],
    queryFn: async () => {
      const response = await apiGetCampaignList({
        ...filter,
        uid: removeDash(filter.uid ?? ''),
      })
      return response.data.data
    },
    enabled,
  })
}

export const useGetCampaignDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_CAMPAIGN_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetCampaignById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

export const useCreateCampaignMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateCampaignRequest | UpdateCampaignRequest[]) => apiCreateCampaign(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_CAMPAIGN_LIST] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateCampaignMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ campaignId, payload }: { campaignId: string; payload: UpdateCampaignRequest }) =>
      apiUpdateCampaign(campaignId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_CAMPAIGN_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteCampaignMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (campaignId: string) => apiDeleteCampaign(campaignId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_CAMPAIGN_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useGetCampaignByDate = (date: string, enabled = false) => {
  return useQuery({
    queryKey: ['GET_CAMPAIGNS_BY_DATE', date],
    queryFn: async () => {
      const response = await apiGetCampaignsByDate(date)
      return response.data.data
    },
    enabled: enabled && !!date,
  })
}

export const useGetCampaignByDateAndUid = (date: string, uid: string, enabled = false) => {
  return useQuery({
    queryKey: ['GET_CAMPAIGNS_BY_DATE_AND_UID', date, uid],
    queryFn: async () => {
      const response = await apiGetCampaignsByDateAndUid(date, uid)
      return response.data.data
    },
    enabled: enabled && !!date && !!uid,
  })
}
