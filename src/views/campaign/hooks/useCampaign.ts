import { ApiAxiosError } from '@/@types/apiError'
import { GET_CAMPAIGN_DETAIL, GET_CAMPAIGN_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import {
  apiCreateCampaign,
  apiDeleteCampaign,
  apiGetCampaignById,
  apiGetCampaignList,
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
      const response = await apiGetCampaignList(filter)
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
  const { openCampaignSummaryDialog } = useCampaignStore()

  return useMutation({
    mutationFn: (payload: UpdateCampaignRequest | UpdateCampaignRequest[]) => apiCreateCampaign(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_CAMPAIGN_LIST] })
      openCampaignSummaryDialog(response.data.data)
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
