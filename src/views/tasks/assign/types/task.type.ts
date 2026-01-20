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
  creator?: User
  createdAt: Date
  updatedAt: Date
  numberOfResultCampaigns: number | null
  numberOfSuspendedAccounts: number | null
  appealProject: string | null
  numberOfAppealDocuments: number | null
  researchContent: string | null
  finalUrlIds: string[]
  gmailIds: string[]
  finalUrls: FinalUrl[]
  totalCost: number
  avgCpc: number

  appealDetails?: TaskAppealDetail[]
  appealSummary?: TaskAppealSummary
  documentAppealDetails?: TaskDocumentAppealDetail[]
  documentAppealSummary?: TaskDocumentAppealSummary
  researchDetails?: TaskResearchDetail[]
  researchSummary?: TaskResearchSummary
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
  numberOfSuspendedAccounts?: number
  appealProject?: string
  numberOfAppealDocuments?: number
  researchContent?: string
}

export type TaskProgressRequest = {
  progress: number
}

export type UpdateAppealMetricsRequest = {
  appealDate: string
  suspensionReason: string
  appealCount: number
  successCount: number
  failureCount: number
}

export type UpdateSingleFinalUrlProgressRequest = {
  progress: number
  finalUrlGroup: FinalURLGroup
}

export type TaskProgressResponse = TaskProgressRequest & {
  id: string
  name: string
  projectId: string
  progress: number
  totalFinalUrls: number
  finalUrls: FinalURLGroup[]
}

export type FinalURLGroup = {
  finalUrlId: string
  finalUrlName: string
  finalURL: string
  totalCampaignDailyStats: number
}

export type TaskProgressDetailResponse = {
  taskId: string
  taskName: string
  finalUrls: FinalURL[]
}

export type FinalURL = {
  id: string
  name: string
  finalURL: string
  targetRef: null
  targetCostPerRef: null
  targetFtd: null
  targetCostPerFtd: null
  targetDailyKeyVolume: null
  targetCpc: null
  budget: null
  userStats: UserStat[]
  campaignStats: CampaignStat[]
}

export type CampaignStat = {
  id: string
  campaignId: string
  campaignName: string
  externalId: string
  uid: string
  date: Date
  gmail: null
  ownerId: string
  ownerUsername: string
  clicks: number
  cost: number
  impression: number
  ctr: number
  cpm: number
  avgCpc: number
  targetCpc: number
  campaignBudget: number
}

export type UserStat = {
  userId: string
  username: string
  firstName: string
  lastName: string
  totalClicks: number
  totalCost: number
  totalImpression: number
  avgCpc: number
  campaignCount: number
}

export type TaskAppealDetail = {
  appealDate: string
  suspensionReason: string
  appealCount: number
  successCount: number
  failureCount: number
  successRate: number
}

export type TaskAppealSummary = {
  totalAppealCount: number
  totalSuccessCount: number
  totalFailureCount: number
  overallSuccessRate: number
}

export type TaskDocumentAppealDetail = {
  appealDate: string
  projectName: string
  appealCount: number
  successCount: number
  note: string | null
  successRate: number
}

export type TaskDocumentAppealSummary = {
  totalAppealCount: number
  totalSuccessCount: number
  totalFailureCount: number
  overallSuccessRate: number
}

export type UpdateDocumentAppealMetricsRequest = {
  appealDate: string
  projectName: string
  appealCount: number
  successCount: number
  note?: string
}

export type TaskResearchDetail = {
  researchDate: string
  result: string
  difficultyLevel: string
}

export type TaskResearchSummary = {
  totalResearchCount: number
  averageDifficulty: string
}

export type UpdateResearchMetricsRequest = {
  researchDate: string
  result: string
  difficultyLevel: string
}
