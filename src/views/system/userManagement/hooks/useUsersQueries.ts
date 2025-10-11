import {
  apiGetUserList,
  apiUpdateStatusUser,
  apiUpdateUser,
} from '@/services/UserService'
import { GET_USER_LIST } from '@/utils/queryKey'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import { UpdateUserRequest } from '@/views/system/userManagement/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetUsersQuery = () => {
  const { filter } = useUserStore()

  return useQuery({
    queryKey: [GET_USER_LIST, filter],
    queryFn: () => {
      return apiGetUserList(filter)
    },
  })
}

export const useUpdateStatusUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => apiUpdateStatusUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_LIST] })
    },
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string
      payload: UpdateUserRequest
    }) => apiUpdateUser(userId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_LIST] })
    },
  })
}
