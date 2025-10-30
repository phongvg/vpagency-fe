import { CommonFilterRequest } from '@/@types/common'
import { Project } from '@/@types/project'
import { User } from '@/@types/user'
import { TaskFrequency, TaskPriority, TaskStatus, TaskType } from '@/enums/task.enum'

export type Task = {
  id: string
  name: string
  type: TaskType
  frequency: TaskFrequency
  priority: TaskPriority
  status: TaskStatus
  progress: number
  note: string | null
  deadline: Date
  projectId: string
  project: Project
  numberOfCampaigns: number | null
  numberOfBackupCampaigns: number
  dailyBudget: number
  numberOfAccounts: number | null
  assignedUsers: User[]
  creatorId: string
  createdAt: Date
  updatedAt: Date
}

export type TasksGroupedByStatus = {
  PENDING: Task[]
  IN_PROGRESS: Task[]
  COMPLETED: Task[]
  CANCELLED: Task[]
}

export type TasksFilterRequest = CommonFilterRequest & {
  status?: TaskStatus
  type?: TaskType
  priority?: TaskPriority
  assignedUserId?: string
  creatorId?: string
  fromDate?: string
  toDate?: string
}
