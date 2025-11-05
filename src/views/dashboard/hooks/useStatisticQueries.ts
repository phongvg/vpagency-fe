import { getUserStatistic } from '@/services/StatisticService'
import { apiGetUserTaskStats } from '@/services/TaskService'
import { GET_TASK_STATISTIC, GET_USER_STATISTIC } from '@/utils/queryKey'
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

export const useTaskStatisticQuery = () => {
  return useQuery({
    queryKey: [GET_TASK_STATISTIC],
    queryFn: async () => {
      const response = await apiGetUserTaskStats()
      return response.data.data
    },
  })
}
