import { CommonFilterRequest } from '@/@types/common'
import { ProjectStatus, ProjectType } from '@/enums/project.enum'

export type ProjectListFilterRequest = CommonFilterRequest & {
  status?: ProjectStatus
  type?: ProjectType
  ownerId?: string
}

export type CreateProjectRequest = {
  name: string
  type: ProjectType
  status?: ProjectStatus
  ownerId?: string
  totalBudget?: number
  spentBudget?: number
  cpc?: number
  exclusiveKeywords?: string[]
  rejectedKeywords?: string[]
  domainStatus?: string
  originalDomain?: string
  originalLadipage?: string
  finalURL?: string
  trackingURL?: string
  targetCountries?: string[]
  rejectedCountries?: string[]
  startedAt?: Date | null
  devices?: string[]
  age?: number | null
  gender?: string
  content?: string
  title?: string
  note?: string
  deadline?: Date | null
  description?: string
}

export type UpdateProjectRequest = Partial<CreateProjectRequest>
