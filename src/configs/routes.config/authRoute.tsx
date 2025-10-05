import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'

const authRoute: Routes = [
  {
    key: 'signIn',
    path: urlConfig.signIn,
    component: lazy(() => import('@/views/auth/SignIn')),
    authority: [],
  },
  {
    key: 'signUp',
    path: urlConfig.signUp,
    component: lazy(() => import('@/views/auth/SignUp')),
    authority: [],
  },
  {
    key: 'forgotPassword',
    path: urlConfig.forgotPassword,
    component: lazy(() => import('@/views/auth/ForgotPassword')),
    authority: [],
  },
  {
    key: 'resetPassword',
    path: urlConfig.resetPassword,
    component: lazy(() => import('@/views/auth/ResetPassword')),
    authority: [],
  },
]

export default authRoute
