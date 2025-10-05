import { lazy } from 'react'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'
import { urlConfig } from '@/configs/urls.config'

const appsRoute: Routes = [
  {
    key: 'taskManagement.assign',
    path: urlConfig.taskAssign,
    component: lazy(() => import('@/views/taskManagement/AssignTask')),
    authority: [ADMIN, USER],
  },
]

export default appsRoute
