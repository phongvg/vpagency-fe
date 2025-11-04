import { ApiAxiosError } from '@/@types/apiError'
import { UpdateUserInfoPayload } from '@/@types/user'
import appConfig from '@/configs/app.config'
import { apiUpdateUserInfo } from '@/services/UserService'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { toastError } from '@/utils/toast'
import { useMutation } from '@tanstack/react-query'

export const useUpdateInfoMutation = (isNavigate?: boolean) => {
  const { updateUser } = useAuthStore()

  return useMutation({
    mutationFn: async (payload: UpdateUserInfoPayload | FormData) => {
      const response = await apiUpdateUserInfo(payload)
      return response.data
    },
    onSuccess: (response) => {
      updateUser(response.data)

      if (isNavigate) {
        window.location.href = appConfig.authenticatedEntryPath
      }
    },
    onError: (error: ApiAxiosError) => {
      toastError(error.response?.data?.message)
    },
  })
}
