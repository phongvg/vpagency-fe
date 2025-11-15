import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateProjectStatus,
  apiDeleteProjectStatus,
  apiGetProjectStatusById,
  apiGetProjectStatusList,
  apiUpdateProjectStatus,
} from '@/views/masterData/projectStatus/services/ProjectStatusService'
import { GET_PROJECT_STATUS_LIST, GET_PROJECT_STATUS_DETAIL } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useProjectStatusStore } from '@/views/masterData/projectStatus/store/useProjectStatusStore'
import { UpdateProjectStatusRequest } from '@/views/masterData/projectStatus/types/projectStatus.type'
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

export const useGetProjectStatusDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_PROJECT_STATUS_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetProjectStatusById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

export const useCreateProjectStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProjectStatusRequest) => apiCreateProjectStatus(payload),
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
