import { MasterData } from '@/@types/masterData'
import { User } from '@/@types/user'
import { FinalUrl } from '@/views/projects/types/finalUrl.type'

export type Project = {
  id: string
  name: string
  typeId: string
  type: MasterData
  statusId: string
  status: MasterData
  ownerId: string
  owner: User
  totalBudget: number | null
  spentBudget: number | null
  cpc: number | null
  exclusiveKeywords: string[]
  rejectedKeywords: string[]
  domainStatus: string
  originalDomain: string
  originalLadipage: string
  finalURL: string
  trackingURL: string
  targetCountries: string[]
  rejectedCountries: string[]
  startedAt: Date | null
  devices: string[]
  ageRange: string[]
  gender: string | null
  content: string | null
  title: string | null
  note: string | null
  deadline: Date | null
  description: string | null
  finalUrls: Partial<FinalUrl>[]
  createdAt: string | Date | null
  updatedAt: string | Date | null
}

export type UpdateProjectRequest = Partial<Project>
