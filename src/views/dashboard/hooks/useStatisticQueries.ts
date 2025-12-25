import { ProjectReportsFilterRequest } from '@/@types/statistic'
import { apiGetProjectReportsStats } from '@/services/FinanceService'
import { apiGetUserStatistic } from '@/services/StatisticService'
import {
  GET_DASHBOARD_PROJECT_STAT,
  GET_MONTHLY_SPENDING_STAT,
  GET_PROJECT_REPORT_STATISTIC,
  GET_TASK_STATISTIC,
  GET_TOP_PROJECTS_BY_PROFIT,
  GET_USER_STATISTIC,
} from '@/utils/queryKey'
import {
  apiGetMonthlySpendingStat,
  apiGetProjectStat,
  apiGetTopProjectsByProfit,
} from '@/views/dashboard/services/StatisticsService'
import { apiGetUserTaskStats } from '@/views/tasks/assign/services/TaskService'
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

export const useProjectStatQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_DASHBOARD_PROJECT_STAT],
    queryFn: async () => {
      const response = await apiGetProjectStat()
      return response.data.data
    },
    enabled,
  })
}

export const useGetMonthlySpendingStat = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_MONTHLY_SPENDING_STAT],
    queryFn: async () => {
      const response = await apiGetMonthlySpendingStat()
      return response.data.data
    },
    enabled,
  })
}

export const useTopProjectsByProfitQuery = (enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_TOP_PROJECTS_BY_PROFIT],
    queryFn: async () => {
      const response = await apiGetTopProjectsByProfit()
      return response.data.data
    },
    enabled,
  })
}
