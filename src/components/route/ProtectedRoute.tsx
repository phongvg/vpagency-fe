import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useAuth from '@/utils/hooks/useAuth'
import { useUserInfo } from '@/utils/hooks/useUserInfo'
import Loading from '@/components/shared/Loading'

const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = () => {
  const { authenticated } = useAuth()
  const { isLoading, isError } = useUserInfo()

  const location = useLocation()

  if (authenticated && isLoading) {
    return <Loading loading={true} />
  }

  if (authenticated && isError) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
      />
    )
  }

  if (!authenticated) {
    return (
      <Navigate
        replace
        to={`${unAuthenticatedEntryPath}?${REDIRECT_URL_KEY}=${location.pathname}`}
      />
    )
  }

  return <Outlet />
}

export default ProtectedRoute
