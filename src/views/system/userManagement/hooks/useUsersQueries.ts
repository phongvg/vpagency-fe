import {
  apiGetUserList,
  apiResetPasswordUser,
  apiUpdateStatusUser,
  apiUpdateUser,
} from '@/services/UserService'
import { GET_USER_LIST } from '@/utils/queryKey'
import { useUserStore } from '@/views/system/userManagement/store/useUserStore'
import {
  ResetPasswordUserRequest,
  UpdateUserRequest,
} from '@/views/system/userManagement/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

export const useGetUsersQuery = () => {
  const { filter } = useUserStore()

  return useQuery({
    queryKey: [GET_USER_LIST, filter],
    queryFn: async () => {
      const response = await apiGetUserList(filter)
      return response.data.data
    },
  })
}

export const useUpdateStatusUserMutation = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (userId: string) => apiUpdateStatusUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [GET_USER_LIST] })
    },
  })
}

export const useUpdateUserMutation = () => {
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

export const useResetPasswordUserMutation = () => {
  return useMutation({
    mutationFn: ({
      userId,
      payload,
    }: {
      userId: string
      payload: ResetPasswordUserRequest
    }) => apiResetPasswordUser(userId, payload),
  })
}
