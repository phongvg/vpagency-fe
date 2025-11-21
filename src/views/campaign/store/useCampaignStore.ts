import { CommonFilterRequest } from '@/@types/common'
import { CreateCampaignResponse, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CampaignState = {
  filter: CommonFilterRequest
  campaigns: UpdateCampaignRequest[]
  campaignId: string | null
  dialogOpen: boolean
  dialogPreviewOpen: boolean
  campaignSummary: CreateCampaignResponse | null
  dialogCampaignSummaryOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setCampaigns: (campaigns: UpdateCampaignRequest[]) => void
  openDialog: (campaignId?: string | null) => void
  closeDialog: () => void
  openPreviewDialog: () => void
  closePreviewDialog: () => void
  openCampaignSummaryDialog: (campaignSummary: CreateCampaignResponse | null) => void
  closeCampaignSummaryDialog: () => void
  clearFilter: () => void
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
  campaignSummary: null,
  dialogCampaignSummaryOpen: false,
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
    openCampaignSummaryDialog: (campaignSummary) =>
      set({ campaignSummary: campaignSummary, dialogCampaignSummaryOpen: true }),
    closeCampaignSummaryDialog: () => set({ campaignSummary: null, dialogCampaignSummaryOpen: false }),
    clearFilter: () => set({ filter: initialCampaignState.filter }),
  })),
)
