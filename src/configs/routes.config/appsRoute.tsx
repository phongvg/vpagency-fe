import { lazy } from 'react'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'
import { Role } from '@/enums/role.enum'

const appsRoute: Routes = [
  {
    key: 'access.denied',
    path: urlConfig.accessDenied,
    component: lazy(() => import('@/views/accessDenied')),
    authority: [],
  },
  {
    key: 'dashboard',
    path: urlConfig.dashboard,
    component: lazy(() => import('@/views/dashboard')),
    authority: [Role.ADMIN],
  },
  {
    key: 'users',
    path: urlConfig.users,
    component: lazy(() => import('@/views/systems/users')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Tài khoản hệ thống',
    },
  },
  {
    key: 'updateInfo',
    path: urlConfig.userUpdateInfo,
    component: lazy(() => import('@/views/user/updateInfo')),
    authority: [],
    meta: {
      layout: 'blank',
    },
  },
  {
    key: 'profile',
    path: urlConfig.userProfile,
    component: lazy(() => import('@/views/user/profile')),
    authority: [],
    meta: {
      header: 'Thông tin cá nhân',
    },
  },
  {
    key: 'taskAssign',
    path: urlConfig.taskAssign,
    component: lazy(() => import('@/views/tasks/assign')),
    authority: [Role.ADMIN],
  },
  {
    key: 'adsAccounts',
    path: urlConfig.adsAccounts,
    component: lazy(() => import('@/views/systems/adsAccounts')),
    authority: [Role.ADMIN],
  },
  {
    key: 'adsGroups',
    path: urlConfig.adsGroups,
    component: lazy(() => import('@/views/systems/adsGroups')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Nhóm tài khoản Ads',
    },
  },
  {
    key: 'projects',
    path: urlConfig.projects,
    component: lazy(() => import('@/views/systems/projects')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Dự án',
    },
  },
]

export default appsRoute
