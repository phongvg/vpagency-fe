import { CommonFilterRequest } from '@/@types/common'
import { User } from '@/@types/user'
import { TaskFrequency, TaskPriority, TaskStatus, TaskType } from '@/enums/task.enum'
import { Project } from '@/views/projects/types/project.type'

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
  adsGroupId: string | null
  numberOfCampaigns: number | null
  numberOfBackupCampaigns: number
  dailyBudget: number
  numberOfAccounts: number | null
  assignedUsers: User[]
  creatorId: string
  createdAt: Date
  updatedAt: Date
  numberOfResultCampaigns: number | null
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
  projectId?: string
  fromDate?: string
  toDate?: string
}

export interface TaskStatisticResponse {
  onGoing: number
  finished: number
  delayed: number
  total: number
  series: Series[]
  range: string[]
}

export interface Series {
  name: string
  data: number[]
}
