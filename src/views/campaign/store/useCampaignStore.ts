import { CommonFilterRequest } from '@/@types/common'
import { CreateCampaignResponse, GmailUIDMapping, UpdateCampaignRequest } from '@/views/campaign/types/campaign.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type CampaignFilterRequest = CommonFilterRequest & {
  importAtFrom?: string
  importAtTo?: string
  dateFrom?: string
  dateTo?: string
  uid?: string
  externalId?: string
  gmail?: string
  campaignName?: string
}

type CampaignState = {
  filter: CampaignFilterRequest
  campaigns: UpdateCampaignRequest[]
  emailAssignments: GmailUIDMapping[]
  campaignId: string | null
  dialogOpen: boolean
  dialogPreviewOpen: boolean
  dialogEmailPreviewOpen: boolean
  campaignSummary: CreateCampaignResponse | null
  dialogCampaignSummaryOpen: boolean

  setFilter: (filter: CampaignFilterRequest) => void
  setCampaigns: (campaigns: UpdateCampaignRequest[]) => void
  setEmailAssignments: (emailAssignments: GmailUIDMapping[]) => void
  openDialog: (campaignId?: string | null) => void
  closeDialog: () => void
  openPreviewDialog: () => void
  closePreviewDialog: () => void
  openEmailPreviewDialog: () => void
  closeEmailPreviewDialog: () => void
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
  emailAssignments: [],
  campaignId: null,
  dialogOpen: false,
  dialogPreviewOpen: false,
  dialogEmailPreviewOpen: false,
  campaignSummary: null,
  dialogCampaignSummaryOpen: false,
}

export const useCampaignStore = create<CampaignState>()(
  devtools((set) => ({
    ...initialCampaignState,

    setFilter: (filter) => set({ filter }),
    setCampaigns: (campaigns) => set({ campaigns }),
    setEmailAssignments: (emailAssignments) => set({ emailAssignments }),
    openDialog: (campaignId) => set({ campaignId: campaignId || null, dialogOpen: true }),
    closeDialog: () => set({ campaignId: null, dialogOpen: false }),
    openPreviewDialog: () => set({ dialogPreviewOpen: true }),
    closePreviewDialog: () => set({ dialogPreviewOpen: false }),
    openEmailPreviewDialog: () => set({ dialogEmailPreviewOpen: true }),
    closeEmailPreviewDialog: () => set({ dialogEmailPreviewOpen: false }),
    openCampaignSummaryDialog: (campaignSummary) =>
      set({ campaignSummary: campaignSummary, dialogCampaignSummaryOpen: true }),
    closeCampaignSummaryDialog: () => set({ campaignSummary: null, dialogCampaignSummaryOpen: false }),
    clearFilter: () => set({ filter: initialCampaignState.filter }),
  })),
)
