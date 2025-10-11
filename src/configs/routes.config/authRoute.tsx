import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'

const authRoute: Routes = [
  {
    key: 'login',
    path: urlConfig.login,
    component: lazy(() => import('@/views/auth/Login')),
    authority: [],
  },
  {
    key: 'loginTelegram',
    path: urlConfig.loginTelegram,
    component: lazy(() => import('@/views/auth/LoginTelegram')),
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
