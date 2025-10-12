import { useMutation } from '@tanstack/react-query'
import { apiLogin } from '@/services/AuthService'
import { LoginRequest } from '@/@types/auth'

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: (payload: LoginRequest) => apiLogin(payload),
  })
}
