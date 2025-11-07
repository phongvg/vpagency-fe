import { useMutation } from '@tanstack/react-query'
import { apiLoginTelegram } from '@/services/AuthService'

export const useLoginTelegramMutation = (code: string) => {
  return useMutation({
    mutationFn: () => apiLoginTelegram(code),
  })
}
