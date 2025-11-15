import { CommonFilterRequest } from '@/@types/common'
import { Campaign } from '@/views/campaign/types/campaign.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CampaignState = {
  filter: CommonFilterRequest
  campaigns: Campaign[]
  campaignId: string | null
  dialogOpen: boolean
  dialogPreviewOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setCampaigns: (campaigns: Campaign[]) => void
  openDialog: (campaignId?: string | null) => void
  closeDialog: () => void
  openPreviewDialog: () => void
  closePreviewDialog: () => void
}

export const initialCampaignState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
  },
  campaigns: [],
  campaignId: null,
  dialogOpen: false,
  dialogPreviewOpen: false,
}

export const useCampaignStore = create<CampaignState>()(
  devtools((set) => ({
    ...initialCampaignState,

    setFilter: (filter) => set({ filter }),
    setCampaigns: (campaigns) => set({ campaigns }),
    openDialog: (campaignId) => set({ campaignId: campaignId || null, dialogOpen: true }),
    closeDialog: () => set({ campaignId: null, dialogOpen: false }),
    openPreviewDialog: () => set({ dialogPreviewOpen: true }),
    closePreviewDialog: () => set({ dialogPreviewOpen: false }),
  })),
)
