import { UpdateUserInfoPayload } from '@/@types/user'
import appConfig from '@/configs/app.config'
import { apiUpdateUserInfo } from '@/services/UserService'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

export const useUpdateInfoMutation = () => {
  const { updateUser } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (payload: UpdateUserInfoPayload) => {
      const response = await apiUpdateUserInfo(payload)
      return response.data.data
    },
    onSuccess: (data) => {
      updateUser(data)
      navigate(appConfig.authenticatedEntryPath, { replace: true })
    },
  })
}
