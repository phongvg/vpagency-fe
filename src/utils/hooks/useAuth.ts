import appConfig from '@/configs/app.config'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuthStore } from '@/store/auth/useAuthStore'
import { apiLogout } from '@/services/AuthService'
import { REFRESH_TOKEN_KEY, USER_ID } from '@/constants/app.constant'
import { urlConfig } from '@/configs/urls.config'
import { User } from '@/@types/user'
import { localStorageUtils } from '@/utils/storage'
import { toastSuccess } from '@/utils/toast'
import { MESSAGES } from '@/constants/message.constant'

interface LoginSuccessData {
  accessToken: string
  refreshToken: string
  user: User
  isOnboarding?: boolean
  redirectUrl?: string
}

function useAuth() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { isAuthenticated, token, setSession, clearSession } = useAuthStore()

  useEffect(() => {
    const handleTokenExpired = () => {
      handleSignOut()
    }

    window.addEventListener('token-expired', handleTokenExpired)

    return () => {
      window.removeEventListener('token-expired', handleTokenExpired)
    }
  }, [navigate])

  const handleLoginSuccess = ({
    accessToken,
    refreshToken,
    user,
    isOnboarding = false,
    redirectUrl,
  }: LoginSuccessData) => {
    setSession(accessToken, user)

    localStorageUtils.setItem(USER_ID, user.id)

    Cookies.set(REFRESH_TOKEN_KEY, refreshToken, {
      secure: true,
      sameSite: 'strict',
    })

    toastSuccess(MESSAGES.LOGIN_SUCCESS)

    if (isOnboarding) {
      navigate(urlConfig.userUpdateInfo, { replace: true })
    } else if (redirectUrl) {
      navigate(redirectUrl)
    } else {
      navigate(appConfig.authenticatedEntryPath, { replace: true })
    }
  }

  const handleSignOut = () => {
    clearSession()
    queryClient.clear()
    Cookies.remove(REFRESH_TOKEN_KEY)
    localStorageUtils.removeItem(USER_ID)

    toastSuccess(MESSAGES.LOGOUT_SUCCESS)

    navigate(appConfig.unAuthenticatedEntryPath)
  }

  const signOut = async () => {
    try {
      await apiLogout()
    } catch (error) {
      console.error(error)
    } finally {
      handleSignOut()
    }
  }

  return {
    authenticated: !!token && isAuthenticated,
    handleLoginSuccess,
    signOut,
  }
}

export default useAuth
