import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'
import { Role } from '@/enums/role.enum'

const appsRoute: Routes = [
  {
    key: 'dashboard',
    path: urlConfig.dashboard,
    component: lazy(() => import('@/views/dashboard')),
    authority: [Role.ADMIN],
  },
  {
    key: 'system.userManagement',
    path: urlConfig.systemUserManagement,
    component: lazy(() => import('@/views/system/userManagement')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Quản lý tài khoản',
    },
  },
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
    key: 'user.profile',
    path: urlConfig.userProfile,
    component: lazy(() => import('@/views/user/Profile')),
    authority: [],
    meta: {
      header: 'Thông tin cá nhân',
    },
  },
]

export default appsRoute
