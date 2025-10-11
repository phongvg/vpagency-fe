import { useEffect } from 'react'
import useSearchParams from '@/utils/hooks/useSearchParams'
import { useLoginTelegramMutation } from '@/views/auth/LoginTelegram/hooks/useLoginTelegramMutation'
import { useNavigate } from 'react-router-dom'
import { urlConfig } from '@/configs/urls.config'
import { Button } from '@/components/ui'
import { MESSAGES } from '@/constants/message.constant'
import useAuth from '@/utils/hooks/useAuth'

export default function LoginTelegram() {
  const navigate = useNavigate()
  const { handleLoginSuccess } = useAuth()
  const { get } = useSearchParams()
  const code = get('code')

  const loginTelegramMutation = useLoginTelegramMutation(code ?? '')

  useEffect(() => {
    if (code) {
      loginTelegramMutation.mutate(undefined, {
        onSuccess: (response) => {
          const { accessToken, refreshToken, isOnboarding, user } =
            response.data.data

          handleLoginSuccess({
            accessToken,
            refreshToken,
            user,
            isOnboarding,
          })
        },
      })
    } else {
      navigate(urlConfig.login)
    }
  }, [code, navigate, handleLoginSuccess])

  if (loginTelegramMutation.isPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="mx-auto border-b-2 border-blue-600 rounded-full w-12 h-12 animate-spin"></div>
          <p className="mt-4 text-gray-600">Đang xác thực...</p>
        </div>
      </div>
    )
  }

  if (loginTelegramMutation.isError) {
    const error = loginTelegramMutation.error as any
    const errorMessage = error?.response?.data?.message || MESSAGES.SOME_ERROR

    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h3 className="mb-2 text-red-600 uppercase">Đăng nhập thất bại!</h3>
          <p className="mb-6 text-gray-700">{errorMessage}</p>
          <Button variant="twoTone" onClick={() => navigate(urlConfig.login)}>
            Quay lại đăng nhập
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-center">
        <h3 className="text-gray-600">Đang xử lý đăng nhập...</h3>
      </div>
    </div>
  )
}
