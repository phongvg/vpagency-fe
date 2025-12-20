import { FinalUrl } from '@/views/projects/types/finalUrl.type'

export type Campaign = {
  id: string
  importAt: string | null
  date: string | null
  uid: string | null
  mcc: string | null
  name: string | null
  externalId: string | null
  finalUrl: FinalUrl | null
  finalUrlId: string | null
  gmail: string | null
  status: string
  keywords: KeywordMatch[]
  negativeKeywords: KeywordMatch[]
  topSearchTerms: SearchTerm[]
  avgCpc: number | null
  targetCpc: number | null
  clicks: number | null
  ctr: number | null
  cpm: number | null
  cost: number | null
  impression: number | null
  targetLocations: string[]
  locationStats: LocationStat[]
  finalUrlImport: string | null
  finalUrlImportId: string | null
  campaignBudget: number
  locationExcluded: string[]
}

export type KeywordMatch = {
  keyword: string
  match: string
  clicks?: number | null
  ctr?: number | null
  cpc?: number | null
  cpm?: number | null
  cost?: number | null
  impression?: number | null
  bid?: number | null
}

export type SearchTerm = {
  term: string
  cpc: number | null
  cost: number | null
  clicks: number | null
  ctr: number | null
  cpm: number | null
  impression: number | null
}

export type LocationStat = {
  location: string
  clicks: number | null
  ctr: number | null
  cpc: number | null
  cost: number | null
  cpm: number | null
  impression: number | null
}

export type UpdateCampaignRequest = {
  importAt: string | null
  date: string | null
  uid: string | null
  mcc: string | null
  gmail: string | null
  name: string | null
  externalId: string | null
  finalUrl: string | null
  keywords: KeywordMatch[]
  topSearchTerms: SearchTerm[]
  status: string
  avgCpc: number | null
  targetCpc: number | null
  clicks: number | null
  ctr: number | null
  cpm: number | null
  cost: number | null
  impression: number | null
  targetLocations: string[]
  locationStats: LocationStat[]
  campaignBudget: number | null
  negativeKeywords: KeywordMatch[]
  locationExcluded: string[]
}

export type CreateCampaignResponse = {
  summary: Summary
  success: Campaign[]
  failed: Array<{ campaign: Campaign; error: string }>
}

export type Summary = {
  total: number
  succeeded: number
  failed: number
}

export type CurrencyRate = {
  uid: string
  code: string
  rateToUSD: number | null
}

export type AssignToFinalUrlRequest = {
  finalUrlId: string
  campaignDailyStatIds: string[]
}

export type RemoveFromFinalUrlRequest = {
  finalUrlId: string
  campaignDailyStatId: string
}

export type GmailUIDMapping = {
  gmail: string
  uid: string
}

export type AssignToEmailRequest = {
  mappings: GmailUIDMapping[]
}
