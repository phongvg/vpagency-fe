import { apiGetTasksGroupedByStatus, apiUpdateTaskStatus } from '@/services/TaskService'
import { GET_TASK_LIST } from '@/utils/queryKey'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export const useGetTasksGroupedByStatus = () => {
  return useQuery({
    queryKey: [GET_TASK_LIST],
    queryFn: async () => {
      const response = await apiGetTasksGroupedByStatus()
      return response.data
    },
  })
}

export const useTasksBoard = () => {
  const { setBoard, board } = useBoardStore()

  const query = useGetTasksGroupedByStatus()

  useEffect(() => {
    if (query.data && query.isSuccess && query.data.data) {
      setBoard(query.data.data.data)
    }
  }, [query.data, query.isSuccess, setBoard])

  return {
    ...query,
    board,
  }
}

export const useUpdateTaskStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await apiUpdateTaskStatus(taskId, status)
      return response.data.data
    },
    // Bỏ onSuccess để không refetch API
    // State sẽ được update optimistically ở component level
  })
}
