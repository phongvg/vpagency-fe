import { useEffect } from 'react'
import { apiGetTasksGroupedByStatus, apiUpdateTaskStatus } from '@/services/TaskService'
import { GET_TASK_LIST } from '@/utils/queryKey'
import { useBoardStore } from '@/views/tasks/assign/store/useBoardStore'
import { useMutation, useQuery } from '@tanstack/react-query'

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
  return useMutation({
    mutationFn: async ({ taskId, status }: { taskId: string; status: string }) => {
      const response = await apiUpdateTaskStatus(taskId, status)
      return response.data.data
    },
  })
}
