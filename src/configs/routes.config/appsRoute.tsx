import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'
import { ADMIN } from '@/constants/roles.constant'

const appsRoute: Routes = [
  {
    key: 'access.denied',
    path: urlConfig.accessDenied,
    component: lazy(() => import('@/views/accessDenied')),
    authority: [],
  },
  {
    key: 'user.updateInfo',
    path: urlConfig.userUpdateInfo,
    component: lazy(() => import('@/views/user/UpdateInfo')),
    authority: [],
    meta: {
      layout: 'blank',
    },
  },
  {
    key: 'system.permission',
    path: urlConfig.systemPermission,
    component: lazy(() => import('@/views/system/permission')),
    authority: [ADMIN],
  },
  {
    key: 'system.userManagement',
    path: urlConfig.systemUserManagement,
    component: lazy(() => import('@/views/system/userManagement')),
    authority: [ADMIN],
    meta: {
      header: 'Quản lý tài khoản',
    },
  },
]

export default appsRoute
