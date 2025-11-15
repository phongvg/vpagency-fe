import { Campaign } from '@/@types/campaign'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type CampaignState = {
  campaigns: Campaign[]
  dialogOpen: boolean

  setCampaigns: (campaigns: Campaign[]) => void
  openDialog: () => void
  closeDialog: () => void
}

export const initialCampaignState = {
  campaigns: [],
  dialogOpen: false,
}

export const useCampaignStore = create<CampaignState>()(
  devtools((set) => ({
    ...initialCampaignState,

    setCampaigns: (campaigns) => set({ campaigns }),
    openDialog: () => set({ dialogOpen: true }),
    closeDialog: () => set({ dialogOpen: false }),
  })),
)
