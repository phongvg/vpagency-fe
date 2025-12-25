import { CommonFilterRequest, Meta } from '@/@types/common'
import { LocationStat } from '@/views/campaign/types/campaign.type'

export type ProjectDailyStatFilterRequest = CommonFilterRequest & {
  fromDate?: string
  toDate?: string
  projectName?: string
}

export type ProjectDailyStatResponse = {
  success: boolean
  message?: string
  data: {
    items: ProjectDailyStat[]
    summary: ProjectDailyStatSummary[]
    meta: Meta
  }
}

export type ProjectDailyStat = {
  id: string
  projectId: string
  projectName: string
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

export type ProjectDailyStatSummary = {
  projectId: string
  projectName: string
  totalCost: number
  totalClicks: number
  avgTargetCpc: number
  activeCountries: string[]
  profit: number
  roi: number
  holdRevenue: number
  receivedRevenue: number
  totalRef: number
  costPerRef: number
  rateRefPerClick: number
  totalFtd: number
  costPerFtd: number
  rateFtdPerRef: number
  totalTargetDailyKeyVolume: number
  totalTargetRef: number
  clickAchievementRate: number
  refAchievementRate: number
}

export type GenerateProjectDailyStatRequest = {
  projectId: string
  date: string
}

export type UpdateProjectDailyStatRequest = Partial<ProjectDailyStat>
