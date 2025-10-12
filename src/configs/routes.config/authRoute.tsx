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
]

export default authRoute
