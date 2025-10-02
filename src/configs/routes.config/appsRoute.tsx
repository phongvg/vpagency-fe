import { lazy } from 'react'
import { APP_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = [
  {
    key: 'taskManagement.assign',
    path: `${APP_PREFIX_PATH}/task/assign`,
    component: lazy(() => import('@/views/taskManagement/AssignTask')),
    authority: [ADMIN, USER],
  },
]

export default appsRoute
