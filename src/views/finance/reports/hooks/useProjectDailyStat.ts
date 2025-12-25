import { GET_PROJECT_DAILY_STAT_DETAIL, GET_PROJECT_DAILY_STAT_LIST } from '@/utils/queryKey'
import {
  apiGenerateProjectDailyReport,
  apiGetProjectDailyReports,
  apiGetProjectDailyStatById,
  apiUpdateProjectDailyStat,
} from '@/views/finance/reports/services/ProjectDailyStatService'
import {
  GenerateProjectDailyStatRequest,
  ProjectDailyStatFilterRequest,
  UpdateProjectDailyStatRequest,
} from '@/views/finance/reports/types/ProjectDailyStat.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useProjectDailyStat = (params: ProjectDailyStatFilterRequest) => {
  return useQuery({
    queryKey: [GET_PROJECT_DAILY_STAT_LIST, params],
    queryFn: async () => {
      const response = await apiGetProjectDailyReports(params)
      return response.data.data
    },
  })
}

export const useGetProjectDailyStatById = (id: string | null) => {
  return useQuery({
    queryKey: [GET_PROJECT_DAILY_STAT_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetProjectDailyStatById(id!)
      return response.data.data
    },
    enabled: !!id,
    staleTime: 0,
    refetchOnMount: true,
  })
}

export const useGenerateProjectDailyReportMutation = () => {
  return useMutation({
    mutationFn: async (payload: GenerateProjectDailyStatRequest) => apiGenerateProjectDailyReport(payload),
  })
}

export const useUpdateProjectDailyStatMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, payload }: { id: string; payload: UpdateProjectDailyStatRequest }) =>
      apiUpdateProjectDailyStat(id, payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DAILY_STAT_LIST] })
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DAILY_STAT_DETAIL, variables.id] })
    },
  })
}
