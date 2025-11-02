import { apiGetAdsAccountById } from '@/services/AdsAccountService'
import { GET_ADS_ACCOUNT_DETAIL } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'

export const useGetAdsAccountQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [GET_ADS_ACCOUNT_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetAdsAccountById(id!)
      return response.data.data
    },
    enabled: !!id,
  })
}
