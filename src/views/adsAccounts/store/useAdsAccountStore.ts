import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { AdsAccount } from '@/@types/adsAccount'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AdsAccountState = {
  filter: CommonFilterRequest
  adsAccounts: AdsAccount[]
  selectedAdsAccount: AdsAccount | null
  dialogOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setAdsAccounts: (adsAccounts: AdsAccount[]) => void
  setSelectedAdsAccount: (adsAccount: AdsAccount | null) => void
  setDialogOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
  clearFilter: () => void
}

export const initialAdsAccountState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  adsAccounts: [],
  selectedAdsAccount: null,
  dialogOpen: false,
  deleteDialogOpen: false,
}

export const useAdsAccountStore = create<AdsAccountState>()(
  devtools((set, get) => ({
    ...initialAdsAccountState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setAdsAccounts: (adsAccounts) => set({ adsAccounts }),
    setSelectedAdsAccount: (adsAccount) => set({ selectedAdsAccount: adsAccount }),
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialAdsAccountState.filter }),
  })),
)
