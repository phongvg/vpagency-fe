import { AdsGroup } from '@/@types/adsGroup'
import { MasterData } from '@/@types/masterData'
import { User } from '@/@types/user'

export interface Project {
  id: string
  name: string
  type: MasterData
  typeId: string
  status: MasterData
  statusId: string
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
  startedAt: Date | null
  devices: string[]
  age: number | null
  gender: string
  content: string | null
  title: string | null
  note: string | null
  deadline: Date | null
  adsGroups: AdsGroup[]
  description: string | null
  ageRanges: string
  genders: string
  createdAt: string | Date | null
  updatedAt: string | Date | null
}

export type UpdateProjectRequest = Partial<Project>
