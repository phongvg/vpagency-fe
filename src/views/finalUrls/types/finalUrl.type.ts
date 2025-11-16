import { Campaign } from '@/views/campaign/types/campaign.type'

export type FinalUrl = {
  id?: string
  campaignId: string
  name: string
  url: string
  country: string
  title: string | null
  description: string | null
  content: string | null
  refTarget: number
  costPerRef: number
  ftdTarget: number
  costPerFtd: number
  volumeKeyPerDay: number
  estimatedRefPerDay: number
  cpc: number
  budget: number
  suggestedBid: number
  active: boolean
  clickCount: number
  lastClickedAt: string | Date | null
  createdAt: string | Date
  updatedAt: string | Date
  campaign?: Campaign
}

export type UpdateFinalUrlRequest = Partial<FinalUrl>
