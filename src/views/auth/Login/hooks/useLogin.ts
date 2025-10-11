import { useMutation } from '@tanstack/react-query'
import { apiLogin } from '@/services/AuthService'
import { LoginPayload } from '@/@types/auth'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginPayload) => apiLogin(payload),
  })
}
