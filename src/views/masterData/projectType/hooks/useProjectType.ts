import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateProjectType,
  apiDeleteProjectType,
  apiGetProjectTypeList,
  apiUpdateProjectType,
} from '@/services/ProjectTypeService'
import { GET_PROJECT_TYPE_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useProjectTypeStore } from '@/views/masterData/projectType/store/useProjectTypeStore'
import { CreateProjectTypeRequest, UpdateProjectTypeRequest } from '@/views/masterData/projectType/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetProjectTypesQuery = () => {
  const { filter } = useProjectTypeStore()

  return useQuery({
    queryKey: [GET_PROJECT_TYPE_LIST, filter],
    queryFn: async () => {
      const response = await apiGetProjectTypeList(filter)
      return response.data.data
    },
  })
}

export const useCreateProjectTypeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: CreateProjectTypeRequest) => apiCreateProjectType(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_TYPE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateProjectTypeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateProjectTypeRequest }) =>
      apiUpdateProjectType(id, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_TYPE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteProjectTypeMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => apiDeleteProjectType(id),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_TYPE_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
