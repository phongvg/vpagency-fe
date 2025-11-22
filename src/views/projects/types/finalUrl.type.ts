import { Campaign } from '@/views/campaign/types/campaign.type'
import { Project } from '@/views/projects/types/project.type'

export type FinalUrl = {
  id: string
  name: string
  finalURL: string
  countries: string[]
  projectId: string
  title: string | null
  content: string | null
  targetRef: number
  targetCostPerRef: number
  targetFtd: number
  targetCostPerFtd: number
  targetDailyKeyVolume: number
  targetCpc: number
  budget: number
  suggestedBid: number
  totalClicks: number
  totalSpent: number
  totalRef: number
  totalFtd: number
  createdAt: string | Date
  updatedAt: string | Date
  campaign: Campaign
  project: Project
}

export type UpdateFinalUrlRequest = Partial<FinalUrl>
