import { Campaign } from '@/views/campaign/types/campaign.type'
import { Project } from '@/views/projects/types/project.type'

export type FinalUrl = {
  id: string
  name: string
  finalURL: string
  countries: string[]
  excludeCountries: string[]
  projectId: string
  title: string | null
  content: string | null
  targetRef: number | null
  targetCostPerRef: number | null
  targetFtd: number | null
  targetCostPerFtd: number | null
  targetDailyKeyVolume: number | null
  targetCpc: number | null
  budget: number | null
  suggestedBid: number | null
  totalClicks: number
  totalSpent: number
  totalRef: number
  totalFtd: number
  createdAt: string | Date
  updatedAt: string | Date
  campaign: Campaign
  project: Project
  campaigns?: CampaignStat[]
}

export type UpdateFinalUrlRequest = Partial<FinalUrl>

export type CampaignStat = {
  id: string
  name: string
  externalId: string
  uid: string
  status: string
  gmailId: string
  latestStat: LatestStat
}

export type LatestStat = {
  date: string
  clicks: number
  cost: number
  impression: number
  ctr: number
  avgCpc: number
}
