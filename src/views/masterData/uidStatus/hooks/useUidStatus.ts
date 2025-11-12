import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateUidStatus,
  apiDeleteUidStatus,
  apiGetUidStatusList,
  apiUpdateUidStatus,
} from '@/services/UidStatusService'
import { GET_UID_STATUS_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useUidStatusStore } from '@/views/masterData/uidStatus/store/useUidStatusStore'
import { CreateUidStatusRequest, UpdateUidStatusRequest } from '@/views/masterData/uidStatus/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetUidStatusesQuery = () => {
  const { filter } = useUidStatusStore()

  return useQuery({
    queryKey: [GET_UID_STATUS_LIST, filter],
    queryFn: async () => {
      const response = await apiGetUidStatusList(filter)
      return response.data.data
    },
  })
}

export const useCreateUidStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateUidStatusRequest) => apiCreateUidStatus(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_UID_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateUidStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateUidStatusRequest }) => apiUpdateUidStatus(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_UID_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteUidStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteUidStatus(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_UID_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
