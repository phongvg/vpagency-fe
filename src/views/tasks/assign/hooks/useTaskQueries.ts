import {
  apiGetTaskDetail,
  apiGetTasksGroupedByStatus,
  apiUpdateTaskStatus,
  apiCreateTask,
  apiUpdateTask,
  apiDeleteTask,
  apiGetTasks,
  apiUpdateTaskProgress,
  apiGetAdsGroupByTaskId,
} from '@/services/TaskService'
import { GET_ADS_GROUP_BY_TASK_ID, GET_TASK_DETAIL, GET_TASK_LIST, GET_TASKS_GROUPED_BY_STATUS } from '@/utils/queryKey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { ApiAxiosError } from '@/@types/apiError'
import { toastError, toastSuccess } from '@/utils/toast'

export const useGetTasksWithFilters = (enabled: boolean = false) => {
  const { filters, activeView } = useBoardStore()

  return useQuery({
    queryKey: [GET_TASK_LIST, activeView, filters],
    queryFn: async () => {
      const response = await apiGetTasks(filters)
      return response.data.data.items
    },
    enabled,
  })
}

export const useGetTasksGroupedByStatus = () => {
  const { activeView } = useBoardStore()

  return useQuery({
    queryKey: [GET_TASKS_GROUPED_BY_STATUS, activeView],
    queryFn: async () => {
      const response = await apiGetTasksGroupedByStatus()
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

export const useGetTaskDetail = (taskId: string | null, enabled: boolean = true) => {
  return useQuery({
    queryKey: [GET_TASK_DETAIL, taskId],
    queryFn: async () => {
      if (!taskId) return null
      const response = await apiGetTaskDetail(taskId)
      return response.data.data
    },
    enabled: enabled && !!taskId,
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
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
    mutationFn: async ({ taskId, data }: { taskId: string; data: any }) => {
      const response = await apiUpdateTask(taskId, data)
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
    mutationFn: async ({ taskId, progress }: { taskId: string; progress: number }) => {
      const response = await apiUpdateTaskProgress(taskId, progress)
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

export const useGetAdsGroupByTaskId = (taskId: string, enabled: boolean = false) => {
  return useQuery({
    queryKey: [GET_ADS_GROUP_BY_TASK_ID, taskId],
    queryFn: () => apiGetAdsGroupByTaskId(taskId),
    enabled: enabled && !!taskId,
  })
}
