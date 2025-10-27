import { User } from './user'

export interface Project {
  id: string
  name: string
  type: string
  status: string
  ownerId: string
  owner?: {
    id: string
    username: string
    firstName: string | null
    lastName: string | null
    email: string | null
    avatar: string | null
  }
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
  startedAt?: string | Date | null
  devices?: string[]
  ageRanges?: string[]
  genders?: string[]
  content?: string
  title?: string
  note?: string
  deadline?: string | Date | null
  description?: string
  createdAt: string | Date
  updatedAt: string | Date
  _count?: {
    adsAccounts: number
    dailyReports: number
  }
}
