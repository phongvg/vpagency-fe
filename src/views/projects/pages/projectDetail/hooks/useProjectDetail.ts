import { apiGetProjectById, apiGetProjectStatistic } from '@/views/projects/services/ProjectService'
import { GET_PROJECT_DETAIL, GET_PROJECT_STATISTIC } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'
import { ProjectStatsFilterRequest } from '@/views/projects/pages/projectDetail/types/projectDetail.type'

export const useGetProjectQuery = (id: string | undefined) => {
  return useQuery({
    queryKey: [GET_PROJECT_DETAIL, id],
    queryFn: async () => {
      const response = await apiGetProjectById(id!)
      return response.data.data
    },
    enabled: !!id,
  })
}

export const useGetProjectStatisticQuery = (id: string | undefined, filters: ProjectStatsFilterRequest) => {
  return useQuery({
    queryKey: [GET_PROJECT_STATISTIC, id, filters],
    queryFn: async () => {
      const response = await apiGetProjectStatistic(id!, filters)
      return response.data.data
    },
    enabled: !!id,
  })
}
