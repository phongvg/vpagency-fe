import { ProjectReportsFilterRequest } from '@/@types/statistic'
import { apiGetFinanceStats, apiGetProjectReportsStats } from '@/services/FinanceService'
import { apiGetUserStatistic } from '@/services/StatisticService'
import { apiGetUserTaskStats } from '@/services/TaskService'
import {
  GET_FINANCE_STATS,
  GET_PROJECT_REPORT_STATISTIC,
  GET_TASK_STATISTIC,
  GET_USER_STATISTIC,
} from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'

export const useUserStatisticQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_USER_STATISTIC],
    queryFn: async () => {
      const response = await apiGetUserStatistic()
      return response.data.data
    },
    enabled,
  })
}

export const useTaskStatisticQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_TASK_STATISTIC],
    queryFn: async () => {
      const response = await apiGetUserTaskStats()
      return response.data.data
    },
    enabled,
  })
}

export const useProjectReportStatisticQuery = (params: ProjectReportsFilterRequest, enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_PROJECT_REPORT_STATISTIC, params],
    queryFn: async () => {
      const response = await apiGetProjectReportsStats(params)
      return response.data.data
    },
    enabled,
  })
}

export const useFinanceStatsQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_FINANCE_STATS],
    queryFn: async () => {
      const response = await apiGetFinanceStats()
      return response.data.data
    },
    enabled,
  })
}
