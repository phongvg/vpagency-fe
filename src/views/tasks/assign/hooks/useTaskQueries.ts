import {
  apiGetTaskDetail,
  apiGetTasksGroupedByStatus,
  apiUpdateTaskStatus,
  apiCreateTask,
  apiUpdateTask,
  apiDeleteTask,
  apiGetTasks,
} from '@/services/TaskService'
import { GET_TASK_DETAIL, GET_TASK_LIST, GET_TASKS_GROUPED_BY_STATUS } from '@/utils/queryKey'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'

export const useGetTasksWithFilters = (enabled: boolean = false) => {
  const { filters, activeView } = useBoardStore()

  return useQuery({
    queryKey: [GET_TASK_LIST, filters, activeView],
    queryFn: async () => {
      const response = await apiGetTasks(filters)
      return response.data.data.data
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
      return response.data.data.data
    },
  })
}

export const useUpdateTaskStatus = () => {
  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await apiUpdateTaskStatus(taskId, status)
      return response.data.data
    },
  })
}

export const useGetTaskDetail = (taskId: string) => {
  return useQuery({
    queryKey: [GET_TASK_DETAIL, taskId],
    queryFn: async () => {
      const response = await apiGetTaskDetail(taskId)
      return response.data.data
    },
  })
}

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: any) => {
      const response = await apiCreateTask(data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_TASK_LIST] })
    },
  })
}
