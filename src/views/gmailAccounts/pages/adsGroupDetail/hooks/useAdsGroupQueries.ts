import { apiGetAdsGroupById } from '@/services/AdsGroupService'
import { GET_ADS_GROUP_DETAIL } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'

export const useGetAdsGroupQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [GET_ADS_GROUP_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetAdsGroupById(id!)
      return response.data.data
    },
    enabled: !!id,
  })
}
