import { CommonFilterRequest } from '@/@types/common'
import { LocationStat } from '@/views/campaign/types/campaign.type'

export type ProjectDailyStatFilterRequest = CommonFilterRequest & {
  fromDate?: string
  toDate?: string
}

export type ProjectDailyStat = {
  id: string
  projectId: string
  date: Date
  totalClicks: number
  totalCost: number
  totalTargetCpc: number
  activeCountries: LocationStat[]
  createdAt: Date
  totalRef: number
  costPerRef: number
  rateRefPerClick: number
  totalFtd: number
  costPerFtd: number
  costFtdPerRef: number
  totalTargetDailyKeyVolume: number
  totalTargetRef: number
  totalClickPerVolume: number
  totalRefPerVolume: number
  receivedRevenue: number
  holdRevenue: number
  profit: number
  roi: number
}

export type GenerateProjectDailyStatRequest = {
  projectId: string
  date: string
}

export type UpdateProjectDailyStatRequest = Partial<ProjectDailyStat>
