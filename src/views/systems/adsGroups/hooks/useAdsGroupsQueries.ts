import { apiCreateAdsGroup, apiDeleteAdsGroup, apiGetAdsGroupList, apiUpdateAdsGroup } from '@/services/AdsGroupService'
import { GET_ADS_GROUP_LIST } from '@/utils/queryKey'
import { useAdsGroupStore } from '@/views/systems/adsGroups/store/useAdsGroupStore'
import { CreateAdsGroupRequest, UpdateAdsGroupRequest } from '@/views/systems/adsGroups/types'
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
    },
  })
}

export const useUpdateAdsGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdsGroupRequest }) => apiUpdateAdsGroup(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
    },
  })
}

export const useDeleteAdsGroupMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteAdsGroup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_LIST] })
    },
  })
}
