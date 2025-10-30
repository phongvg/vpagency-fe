import { ProjectType } from '@/enums/project.enum'
import { User } from './user'

export interface Project {
  id: string
  name: string
  type: ProjectType
  status: string
  ownerId: string
  owner: User
  totalBudget: number
  spentBudget: number
  cpc: number
  exclusiveKeywords: string[]
  rejectedKeywords: string[]
  domainStatus: string
  originalDomain: string
  originalLadipage: string
  finalURL: string
  trackingURL: string
  targetCountries: string[]
  rejectedCountries: string[]
  startedAt: string | Date | null
  devices: string[]
  ageRanges: string[]
  genders: string[]
  content: string | null
  title: string | null
  note: string | null
  deadline: string | Date | null
  description: string | null
  createdAt: string | Date | null
  updatedAt: string | Date | null
}
