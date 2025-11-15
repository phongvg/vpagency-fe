export interface Campaign {
  datePull: string | null
  dateData: string | null
  uid: number | null
  campaignName: string | null
  campaignId: number | null
  finalUrl: string | null
  keyword: string[]
  match: string[]
  searchTerm: string[]
  cpcSearchTerm: number[]
  costSearchTerm: number[]
  statusCampaign: string
  avgCpc: number | null
  micros: number | null
  click: number | null
  ctr: number | null
  cpm: number | null
  cost: number | null
  locationTarget: string[]
  spendingCountry: number | null
  cpcCountry: number | null
  ctrCountry: number | null
  clickCountry: number | null
  costCountry: number | null
}
