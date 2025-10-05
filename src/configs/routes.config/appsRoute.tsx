import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'

const appsRoute: Routes = [
  {
    key: 'task.assign',
    path: urlConfig.taskAssign,
    component: lazy(() => import('@/views/task/assignTask')),
    authority: [ADMIN, USER],
  },
  {
    key: 'system.permission',
    path: urlConfig.systemPermission,
    component: lazy(() => import('@/views/system/permission')),
    authority: [ADMIN, USER],
  },
]

export default appsRoute
