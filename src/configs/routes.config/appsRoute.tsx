import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'
import { Role } from '@/enums/role.enum'
import { lazy } from 'react'

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
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY],
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
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY, Role.MEMBER_AFF, Role.MEMBER_AGENCY],
  },
  {
    key: 'projects',
    path: urlConfig.projects,
    component: lazy(() => import('@/views/projects')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Dự án',
    },
  },
  {
    key: 'projectDetail',
    path: urlConfig.projectDetail,
    component: lazy(() => import('@/views/projects/pages/projectDetail')),
    authority: [Role.ADMIN, Role.MANAGER_AFF, Role.MANAGER_AGENCY],
    meta: {
      header: 'Thông tin dự án',
    },
  },
  {
    key: 'gmailAccounts',
    path: urlConfig.gmailAccounts,
    component: lazy(() => import('@/views/gmailAccounts')),
    authority: [
      Role.ADMIN,
      Role.MANAGER_AFF,
      Role.MANAGER_AGENCY,
      Role.MEMBER_AFF,
      Role.MEMBER_AGENCY,
      Role.ACCOUNTING,
    ],
    meta: {
      header: 'Tài khoản Gmail',
    },
  },
  {
    key: 'projectTypes',
    path: urlConfig.projectTypes,
    component: lazy(() => import('@/views/masterData/projectType')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Loại dự án',
    },
  },
  {
    key: 'projectStatus',
    path: urlConfig.projectStatus,
    component: lazy(() => import('@/views/masterData/projectStatus')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Trạng thái dự án',
    },
  },
  {
    key: 'gmailStatus',
    path: urlConfig.gmailStatus,
    component: lazy(() => import('@/views/masterData/gmailStatus')),
    authority: [Role.ADMIN],
    meta: {
      header: 'Trạng thái Gmail',
    },
  },
  {
    key: 'campaigns',
    path: urlConfig.campaigns,
    component: lazy(() => import('@/views/campaign')),
    authority: [
      Role.ADMIN,
      Role.MANAGER_AFF,
      Role.MANAGER_AGENCY,
      Role.MEMBER_AFF,
      Role.MEMBER_AGENCY,
      Role.ACCOUNTING,
    ],
    meta: {
      header: 'Chiến dịch',
    },
  },
]

export default appsRoute
