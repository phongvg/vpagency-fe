import { ApiAxiosError } from '@/@types/apiError'
import {
  AdsAccountDailyMetricListFilterRequest,
  CreateAdsAccountDailyMetricRequest,
  UpdateAdsAccountDailyMetricRequest,
} from '@/@types/adsAccountDailyMetric'
import {
  apiCreateDailyMetric,
  apiDeleteDailyMetric,
  apiGetDailyMetricList,
  apiUpdateDailyMetric,
} from '@/services/AdsAccountDailyMetricService'
import { GET_ADS_ACCOUNT_DAILY_METRICS, GET_ADS_ACCOUNT_DETAIL, GET_ADS_GROUP_BY_TASK_ID } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetDailyMetricsQuery = (filters: AdsAccountDailyMetricListFilterRequest) => {
  return useQuery({
    queryKey: [GET_ADS_ACCOUNT_DAILY_METRICS, filters],
    queryFn: async () => {
      const response = await apiGetDailyMetricList(filters)
      return response.data.data
    },
    enabled: !!filters.adsAccountId,
  })
}

export const useCreateDailyMetricMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateAdsAccountDailyMetricRequest) => apiCreateDailyMetric(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DAILY_METRICS] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_BY_TASK_ID] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateDailyMetricMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateAdsAccountDailyMetricRequest }) =>
      apiUpdateDailyMetric(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DAILY_METRICS] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_BY_TASK_ID] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteDailyMetricMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteDailyMetric(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DAILY_METRICS] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_ACCOUNT_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_ADS_GROUP_BY_TASK_ID] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
