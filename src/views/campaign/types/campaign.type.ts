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
  gmailId: string | null
  keywords: KeywordMatch[]
  topSearchTerms: SearchTerm[]
  status: string
  avgCpc: number | null
  targetCpc: number | null
  clicks: number | null
  ctr: number | null
  cpm: number | null
  budget: number | null
  targetLocations: string[]
  locationStats: LocationStat[]
  finalUrlImport: string | null
  finalUrlImportId: string | null
}

export type KeywordMatch = {
  keyword: string
  match: string
}

export type SearchTerm = {
  term: string
  cpc: number
  spent: number
}

export type LocationStat = {
  location: string
  clicks: number
  ctr: number
  cpc: number
  spent: number
}

export type UpdateCampaignRequest = {
  importAt: string | null
  date: string | null
  uid: string | null
  mcc: string | null
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
  budget: number | null
  targetLocations: string[]
  locationStats: LocationStat[]
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
