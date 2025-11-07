import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'

const authRoute: Routes = [
  {
    key: 'login',
    path: urlConfig.login,
    component: lazy(() => import('@/views/auth/login')),
    authority: [],
  },
  {
    key: 'loginTelegram',
    path: urlConfig.loginTelegram,
    component: lazy(() => import('@/views/auth/loginTelegram')),
    authority: [],
  },
]

export default authRoute
