import { ApiAxiosError } from '@/@types/apiError'
import {
  ProjectDailyReportListFilterRequest,
  CreateProjectDailyReportRequest,
  UpdateProjectDailyReportRequest,
} from '@/@types/projectDailyReport'
import {
  apiCreateProjectDailyReport,
  apiDeleteProjectDailyReport,
  apiGetProjectDailyReportList,
  apiUpdateProjectDailyReport,
} from '@/services/ProjectDailyReportService'
import { GET_PROJECT_DAILY_REPORTS, GET_PROJECT_DETAIL, GET_PROJECT_REPORT_STATISTIC } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetProjectDailyReportsQuery = (filters: ProjectDailyReportListFilterRequest) => {
  return useQuery({
    queryKey: [GET_PROJECT_DAILY_REPORTS, filters],
    queryFn: async () => {
      const response = await apiGetProjectDailyReportList(filters)
      return response.data.data
    },
    enabled: !!filters.projectId,
  })
}

export const useCreateProjectDailyReportMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateProjectDailyReportRequest) => apiCreateProjectDailyReport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DAILY_REPORTS] })
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateProjectDailyReportMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectDailyReportRequest }) =>
      apiUpdateProjectDailyReport(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DAILY_REPORTS] })
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_REPORT_STATISTIC] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteProjectDailyReportMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteProjectDailyReport(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DAILY_REPORTS] })
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL] })
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
