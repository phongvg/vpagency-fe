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
      header: 'Tài khoản hệ thống',
    },
  },
  {
    key: 'systems.adsGroups',
    path: urlConfig.systemAdsGroups,
    component: lazy(() => import('@/views/systems/adsGroups')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Nhóm tài khoản Ads',
    },
  },
  {
    key: 'systems.projects',
    path: urlConfig.systemProjects,
    component: lazy(() => import('@/views/systems/projects')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Dự án',
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
  },
]

export default appsRoute
