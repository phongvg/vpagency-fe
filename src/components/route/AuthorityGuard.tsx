import { PropsWithChildren } from 'react'
import { Navigate } from 'react-router-dom'
import useAuthority from '@/utils/hooks/useAuthority'
import { urlConfig } from '@/configs/urls.config'

type AuthorityGuardProps = PropsWithChildren<{
  userAuthority?: string[]
  authority?: string[]
}>

const AuthorityGuard = (props: AuthorityGuardProps) => {
  const { userAuthority = [], authority = [], children } = props

  const roleMatched = useAuthority(userAuthority, authority)

  return (
    <>{roleMatched ? children : <Navigate to={urlConfig.accessDenied} />}</>
  )
}

export default AuthorityGuard
