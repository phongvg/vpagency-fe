import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { apiGetUserInfo } from '@/services/UserService'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { HttpStatusCode, type AxiosError } from 'axios'
import { GET_USER_INFO } from '@/utils/queryKey'

export function useUserInfo() {
  const { token, setSession, clearSession } = useAuthStore()

  const query = useQuery({
    queryKey: [GET_USER_INFO],
    queryFn: async () => {
      const response = await apiGetUserInfo()
      return response.data.data
    },
    enabled: !!token,
    staleTime: 5 * 60 * 1000,
    retry: false,
  })

  useEffect(() => {
    if (query.data && token) {
      setSession(token, query.data)
    }
  }, [query.data, token, setSession])

  useEffect(() => {
    if (query.error) {
      const axiosError = query.error as AxiosError
      if (axiosError.response?.status === HttpStatusCode.Unauthorized) {
        clearSession()
      }
    }
  }, [query.error, clearSession])

  return query
}
