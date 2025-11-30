import { CommonFilterRequest } from '@/@types/common'
import { User } from '@/@types/user'
import { Project } from '@/views/projects/types/project.type'

export type UserStatisticResponse = {
  total: number
  byStatus: ByStatus
  byRole: ByRole[]
}

export type ByRole = {
  _count: number
  roles: string[]
}

export type ByStatus = {
  active: number
  inactive: number
  onboarding: number
}

export type ProjectReportsFilterRequest = CommonFilterRequest & {
  projectId?: string
  runnerId?: string
}

export type ProjectReports = {
  id: string
  date: Date
  projectId: string
  runnerId: string
  linkDeployed: string | null
  totalSpent: number
  totalClicks: number
  totalCpc: number
  highestCpc: number
  totalRef: number
  costPerRef: number
  totalFtd: number
  costPerFtd: number
  createdAt: Date
  updatedAt: Date
  project: Project
  runner: User
}

export type FinanceStats = {
  totalProjects: number
  activeProjects: number
  totalTasks: number
  completedTasksToday: number
  totalSpent: number
  todaySpent: number
}
