import { apiGetProjectById } from '@/services/ProjectService'
import { GET_PROJECT_DETAIL } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'

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
