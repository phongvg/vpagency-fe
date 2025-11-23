import { ApiAxiosError } from '@/@types/apiError'
import { GET_GMAIL_STATUS_DETAIL, GET_GMAIL_STATUS_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import {
  apiCreateGmailStatus,
  apiDeleteGmailStatus,
  apiGetGmailStatusById,
  apiGetGmailStatusList,
  apiUpdateGmailStatus,
} from '@/views/masterData/gmailStatus/services/GmailStatusService'
import { useGmailStatusStore } from '@/views/masterData/gmailStatus/store/useGmailStatusStore'
import { UpdateGmailStatusRequest } from '@/views/masterData/gmailStatus/types/gmailStatus.type'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetGmailStatusesQuery = () => {
  const { filter } = useGmailStatusStore()

  return useQuery({
    queryKey: [GET_GMAIL_STATUS_LIST, filter],
    queryFn: async () => {
      const response = await apiGetGmailStatusList(filter)
      return response.data.data
    },
  })
}

export const useGetGmailStatusDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_GMAIL_STATUS_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetGmailStatusById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

export const useCreateGmailStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateGmailStatusRequest) => apiCreateGmailStatus(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateGmailStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateGmailStatusRequest }) =>
      apiUpdateGmailStatus(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteGmailStatusMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteGmailStatus(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_GMAIL_STATUS_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
