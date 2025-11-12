import { apiGetUserInfo } from '@/services/UserService'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { GET_USER_INFO } from '@/utils/queryKey'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export function useUserInfo() {
  const { token, setSession, clearSession } = useAuthStore()

  const query = useQuery({
    queryKey: [GET_USER_INFO],
    queryFn: async () => {
      const response = await apiGetUserInfo()
      return response.data.data
    },
    enabled: !!token,
  })

  useEffect(() => {
    if (query.data && token) {
      setSession(token, query.data)
    }
  }, [query.data, token, setSession])

  useEffect(() => {
    if (query.error) {
      clearSession()
    }
  }, [query.error, clearSession])

  return query
}
