import { ApiAxiosError } from '@/@types/apiError'
import { apiCreateAdsGroup, apiDeleteAdsGroup, apiGetAdsGroupList, apiUpdateAdsGroup } from '@/services/AdsGroupService'
import { GET_ADS_GROUP_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useAdsGroupStore } from '@/views/adsGroups/store/useAdsGroupStore'
import { CreateAdsGroupRequest, UpdateAdsGroupRequest } from '@/views/adsGroups/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetAdsGroupsQuery = () => {
  const { filter } = useAdsGroupStore()

  return useQuery({
    queryKey: [GET_ADS_GROUP_LIST, filter],
    queryFn: async () => {
      const response = await apiGetAdsGroupList(filter)
      return response.data.data
    },
  })
}

export const useCreateAdsGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAdsGroupRequest) => apiCreateAdsGroup(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateAdsGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdsGroupRequest }) => apiUpdateAdsGroup(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteAdsGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteAdsGroup(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
