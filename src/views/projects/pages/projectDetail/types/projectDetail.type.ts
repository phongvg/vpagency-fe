import { KeywordMatch, LocationStat, SearchTerm } from '@/views/campaign/types/campaign.type'

export type ProjectStatsFilterRequest = {
  dateFrom?: string
  dateTo?: string
  finalUrlId?: string
}

export type ProjectStatsResponse = {
  projectId: string
  projectName: string
  finalUrlStats: FinalURLStat[]
  totalStats: TotalStats
}

export type FinalURLStat = {
  finalUrlId: string
  finalUrlName: string
  finalURL: string
  targets: Targets
  totalSpent: number
  totalClicks: number
  totalImpressions: number
  avgCpc: number
  avgCtr: number
  totalCampaigns: number
  keywords: KeywordMatch[]
  negativeKeywords: KeywordMatch[]
  searchTerms: SearchTerm[]
  locations: LocationStat[]
}

export type Targets = {
  targetRef: number
  targetCostPerRef: number
  targetFtd: number
  targetCostPerFtd: number
  targetCpc: number
  budget: number
}

export type TotalStats = {
  totalSpent: number
  totalClicks: number
  totalImpressions: number
  avgCpc: number
  avgCtr: number
  totalCampaigns: number
  keywords: KeywordMatch[]
  negativeKeywords: KeywordMatch[]
  searchTerms: SearchTerm[]
  locations: LocationStat[]
}
