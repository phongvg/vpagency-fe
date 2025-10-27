import { apiCreateProject, apiDeleteProject, apiGetProjectList, apiUpdateProject } from '@/services/ProjectService'
import { GET_PROJECT_LIST } from '@/utils/queryKey'
import { useProjectStore } from '@/views/systems/projects/store/useProjectStore'
import { CreateProjectRequest, UpdateProjectRequest } from '@/views/systems/projects/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

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
    mutationFn: (payload: CreateProjectRequest) => apiCreateProject(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
    },
  })
}

export const useUpdateProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ projectId, payload }: { projectId: string; payload: UpdateProjectRequest }) =>
      apiUpdateProject(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
    },
  })
}

export const useDeleteProjectMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (projectId: string) => apiDeleteProject(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_PROJECT_LIST] })
    },
  })
}
