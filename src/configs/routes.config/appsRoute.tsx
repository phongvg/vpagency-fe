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
    key: 'systems.users',
    path: urlConfig.systemUsers,
    component: lazy(() => import('@/views/systems/users')),
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
    component: lazy(() => import('@/views/user/updateInfo')),
    authority: [],
    meta: {
      layout: 'blank',
    },
  },
  {
    key: 'user.profile',
    path: urlConfig.userProfile,
    component: lazy(() => import('@/views/user/profile')),
    authority: [],
    meta: {
      header: 'Thông tin cá nhân',
    },
  },
  {
    key: 'tasks.assign',
    path: urlConfig.taskAssign,
    component: lazy(() => import('@/views/tasks/assign')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Giao việc',
    },
  },
]

export default appsRoute
