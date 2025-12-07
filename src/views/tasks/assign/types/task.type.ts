import { CommonFilterRequest } from '@/@types/common'
import { User } from '@/@types/user'
import { TaskFrequency, TaskPriority, TaskStatus, TaskType } from '@/enums/task.enum'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'
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
  finalUrlIds: string[]
  gmailIds: string[]
  finalUrls: FinalUrl[]
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

export type TaskStatisticResponse = {
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

export type Columns = Record<string, Task[]>

export type UpdateTaskRequest = {
  name?: string
  type?: TaskType | null
  frequency?: TaskFrequency | null
  priority?: TaskPriority | null
  deadline?: Date | null
  assignedUserIds?: string[]
  projectId?: string | null
  note?: string
  numberOfCampaigns?: number
  numberOfBackupCampaigns?: number
  dailyBudget?: number
  numberOfAccounts?: number
  numberOfResultCampaigns?: number
  finalUrlIds?: string[]
  gmailIds?: string[]
}

export type TaskProgressRequest = {
  progress: number
}

export type UpdateSingleFinalUrlProgressRequest = {
  progress: number
  finalUrlGroup: FinalURLGroup
}

export type FinalURLGroup = {
  finalUrlId: string
  finalUrlName?: string
  finalURL?: string
  date: string | null
  items: Item[]
}

export type Item = {
  uid: string
  gmailId: string
  campaignIds?: string[]
}

export type TaskProgressResponse = TaskProgressRequest & {
  id: string
  name: string
  projectId: string
  progress: number
  finalUrls: FinalURLGroup[]
}
