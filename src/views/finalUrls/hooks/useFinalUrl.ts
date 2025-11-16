import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { GET_FINAL_URL_LIST, GET_FINAL_URL_DETAIL } from '@/utils/queryKey'
import {
  apiGetFinalUrlList,
  apiGetFinalUrlById,
  apiCreateFinalUrl,
  apiUpdateFinalUrl,
  apiDeleteFinalUrl,
} from '../services/FinalUrlService'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { toastError, toastSuccess } from '@/utils/toast'
import { ApiAxiosError } from '@/@types/apiError'
import { UpdateFinalUrlRequest } from '../types/finalUrl.type'

// Query - Lấy danh sách
export const useGetFinalUrlsQuery = () => {
  const { filter } = useFinalUrlStore()

  return useQuery({
    queryKey: [GET_FINAL_URL_LIST, filter],
    queryFn: async () => {
      const response = await apiGetFinalUrlList(filter)
      return response.data.data
    },
  })
}

// Query - Lấy chi tiết (enabled khi dialog mở)
export const useGetFinalUrlDetailQuery = (id: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_FINAL_URL_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetFinalUrlById(id)
      return response.data.data
    },
    enabled: enabled && !!id,
  })
}

// Mutation - Tạo mới
export const useCreateFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateFinalUrlRequest) => apiCreateFinalUrl(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

// Mutation - Cập nhật
export const useUpdateFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ finalUrlId, payload }: { finalUrlId: string; payload: UpdateFinalUrlRequest }) =>
      apiUpdateFinalUrl(finalUrlId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

// Mutation - Xóa
export const useDeleteFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (finalUrlId: string) => apiDeleteFinalUrl(finalUrlId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
