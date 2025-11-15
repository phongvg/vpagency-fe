import { ApiAxiosError } from '@/@types/apiError'
import {
  apiCreateProject,
  apiDeleteProject,
  apiGetProjectList,
  apiUpdateProject,
} from '@/views/projects/services/ProjectService'
import { GET_PROJECT_LIST } from '@/utils/queryKey'
import { toastError, toastSuccess } from '@/utils/toast'
import { useProjectStore } from '@/views/projects/store/useProjectStore'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { UpdateProjectRequest } from '@/views/projects/types/project.type'

export const useGetProjectsQuery = () => {
  const { filter } = useProjectStore()

  return useQuery({
    queryKey: [GET_PROJECT_LIST, filter],
    queryFn: async () => {
      const response = await apiGetProjectList(filter)
      return response.data.data
    },
  })
}

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (payload: UpdateProjectRequest) => apiCreateProject(payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, payload }: { projectId: string; payload: UpdateProjectRequest }) =>
      apiUpdateProject(projectId, payload),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: string) => apiDeleteProject(projectId),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
      toastSuccess(response.data.message)
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
