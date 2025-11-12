import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateProjectStatus,
  apiDeleteProjectStatus,
  apiGetProjectStatusList,
  apiUpdateProjectStatus,
} from '@/services/ProjectStatusService'
import { GET_PROJECT_STATUS_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import { CreateProjectStatusRequest, UpdateProjectStatusRequest } from '@/views/masterData/projectStatus/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetProjectStatusesQuery = () => {
  const { filter } = useProjectStatusStore()

  return useQuery({
    queryKey: [GET_PROJECT_STATUS_LIST, filter],
    queryFn: async () => {
      const response = await apiGetProjectStatusList(filter)
      return response.data.data
    },
  })
}

export const useCreateProjectStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateProjectStatusRequest) => apiCreateProjectStatus(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateProjectStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectStatusRequest }) =>
      apiUpdateProjectStatus(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteProjectStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteProjectStatus(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
