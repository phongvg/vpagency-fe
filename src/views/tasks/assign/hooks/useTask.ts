import { ApiAxiosError } from '@/@types/apiError'
import { removeDash } from '@/helpers/removeDash'
import {
  GET_CAMPAIGN_STATS_BY_FINAL_URL,
  GET_TASK_DETAIL,
  GET_TASK_LIST,
  GET_TASK_PROGRESS,
  GET_TASK_PROGRESS_DETAIL,
  GET_TASKS_GROUPED_BY_STATUS,
} from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { CampaignFilterRequest } from '@/views/campaign/store/useCampaignStore'
import { AssignToFinalUrlRequest, RemoveFromFinalUrlRequest } from '@/views/campaign/types/campaign.type'
import {
  apiAssignCampaignsToFinalUrl,
  apiCreateTask,
  apiDeleteTask,
  apiGetCampaignStatsByFinalUrl,
  apiGetProgressDetail,
  apiGetTaskDetail,
  apiGetTaskProgress,
  apiGetTasks,
  apiGetTasksGroupedByStatus,
  apiRemoveCampaignsFromFinalUrl,
  apiUpdateAppealMetrics,
  apiUpdateDocumentAppealMetrics,
  apiUpdateResearchMetrics,
  apiUpdateTask,
  apiUpdateTaskProgress,
  apiUpdateTaskStatus,
} from '@/views/tasks/assign/services/TaskService'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import {
  TaskProgressRequest,
  UpdateAppealMetricsRequest,
  UpdateTaskRequest,
} from '@/views/tasks/assign/types/task.type'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetTasksWithFilters = (enabled: boolean = false) => {
  const { filters, activeView } = useBoardStore()

  return useQuery({
    queryKey: [GET_TASK_LIST, activeView, filters],
    queryFn: async () => {
      const response = await apiGetTasks(filters)
      return response.data.data
    },
    enabled,
  })
}

export const useGetTasksGroupedByStatus = () => {
  const { activeView, filterByCurrentUser } = useBoardStore()

  return useQuery({
    queryKey: [GET_TASKS_GROUPED_BY_STATUS, activeView, filterByCurrentUser],
    queryFn: async () => {
      const response = await apiGetTasksGroupedByStatus(filterByCurrentUser)
      return response.data.data
    },
  })
}

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await apiUpdateTaskStatus(taskId, status)
      return response.data
    },
    onSuccess: (response) => {
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useGetTaskDetail = (taskId: string | null) => {
  return useQuery({
    queryKey: [GET_TASK_DETAIL, taskId],
    queryFn: async () => {
      const response = await apiGetTaskDetail(taskId!)
      return response.data.data
    },
    enabled: !!taskId,
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: UpdateTaskRequest) => {
      const response = await apiCreateTask(data)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, data }: { taskId: string; data: UpdateTaskRequest }) => {
      const response = await apiUpdateTask(taskId, data)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => {
      const response = await apiDeleteTask(taskId)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateTaskProgress = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, payload }: { taskId: string; payload: TaskProgressRequest }) => {
      const response = await apiUpdateTaskProgress(taskId, payload)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useGetTaskProgress = (taskId: string | null, enabled = false) => {
  return useQuery({
    queryKey: [GET_TASK_PROGRESS, taskId],
    queryFn: async () => {
      const response = await apiGetTaskProgress(taskId!)
      return response.data.data
    },
    enabled: !!taskId && enabled,
  })
}

export const useAssignCampaignsToFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AssignToFinalUrlRequest }) =>
      apiAssignCampaignsToFinalUrl(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_PROGRESS] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useRemoveCampaignsFromFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RemoveFromFinalUrlRequest }) =>
      apiRemoveCampaignsFromFinalUrl(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_PROGRESS] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useGetCampaignStatsByFinalUrl = (
  taskId: string | null,
  finalUrlId: string | null,
  params: CampaignFilterRequest,
  enabled = false,
) => {
  return useQuery({
    queryKey: [GET_CAMPAIGN_STATS_BY_FINAL_URL, taskId, finalUrlId, params],
    queryFn: async () => {
      const response = await apiGetCampaignStatsByFinalUrl(taskId!, finalUrlId!, {
        ...params,
        uid: removeDash(params.uid ?? ''),
      })
      return response.data.data
    },
    enabled: !!taskId && !!finalUrlId && enabled,
  })
}

export const useGetProgressDetail = (taskId: string | null, enabled = false) => {
  return useQuery({
    queryKey: [GET_TASK_PROGRESS_DETAIL, taskId],
    queryFn: async () => {
      const response = await apiGetProgressDetail(taskId!)
      return response.data.data
    },
    enabled: !!taskId && enabled,
  })
}

export const useUpdateAppealMetrics = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, payload }: { taskId: string; payload: UpdateAppealMetricsRequest }) => {
      const response = await apiUpdateAppealMetrics(taskId, payload)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateDocumentAppealMetrics = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, payload }: { taskId: string; payload: UpdateDocumentAppealMetricsRequest }) => {
      const response = await apiUpdateDocumentAppealMetrics(taskId, payload)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateResearchMetrics = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, payload }: { taskId: string; payload: UpdateResearchMetricsRequest }) => {
      const response = await apiUpdateResearchMetrics(taskId, payload)
      return response.data
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_DETAIL] })
      queryClient.invalidateQueries({ queryKey: [GET_TASKS_GROUPED_BY_STATUS] })
      toastSuccess(response.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
