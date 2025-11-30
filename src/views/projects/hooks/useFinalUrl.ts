import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  GET_FINAL_URL_LIST,
  GET_FINAL_URL_DETAIL,
  GET_FINAL_URLS_BY_PROJECT_ID,
  GET_PROJECT_DETAIL,
} from '@/utils/queryKey'
import {
  apiGetFinalUrlList,
  apiGetFinalUrlById,
  apiCreateFinalUrl,
  apiUpdateFinalUrl,
  apiDeleteFinalUrl,
  apiGetFinalUrlByProjectId,
} from '../services/FinalUrlService'
import { useFinalUrlStore } from '../store/useFinalUrlStore'
import { toastError, toastSuccess } from '@/utils/toast'
import { ApiAxiosError } from '@/@types/apiError'
import { UpdateFinalUrlRequest } from '../types/finalUrl.type'

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

export const useCreateFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateFinalUrlRequest) => apiCreateFinalUrl(payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })

      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: [GET_FINAL_URLS_BY_PROJECT_ID, variables.projectId] })
        queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL, variables.projectId] })
      }
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ finalUrlId, payload }: { finalUrlId: string; payload: UpdateFinalUrlRequest }) =>
      apiUpdateFinalUrl(finalUrlId, payload),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })
      if (variables.payload.projectId) {
        queryClient.invalidateQueries({ queryKey: [GET_FINAL_URLS_BY_PROJECT_ID, variables.payload.projectId] })
        queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL, variables.payload.projectId] })
      }
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteFinalUrlMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ finalUrlId }: { finalUrlId: string; projectId?: string }) => apiDeleteFinalUrl(finalUrlId),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: [GET_FINAL_URL_LIST] })
      if (variables.projectId) {
        queryClient.invalidateQueries({ queryKey: [GET_FINAL_URLS_BY_PROJECT_ID, variables.projectId] })
        queryClient.invalidateQueries({ queryKey: [GET_PROJECT_DETAIL, variables.projectId] })
      }
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useGetFinalUrlsByProjectId = (projectId: string, enabled = false) => {
  return useQuery({
    queryKey: [GET_FINAL_URLS_BY_PROJECT_ID, projectId],
    queryFn: async () => {
      const response = await apiGetFinalUrlByProjectId(projectId)
      return response.data.data
    },
    enabled: enabled && !!projectId,
  })
}
