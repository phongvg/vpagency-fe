import { getUserStatistic } from '@/services/StatisticService'
import { GET_USER_STATISTIC } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'

export const useUserStatisticQuery = () => {
  return useQuery({
    queryKey: [GET_USER_STATISTIC],
    queryFn: async () => {
      const response = await getUserStatistic()
      return response.data.data
    },
  })
}
