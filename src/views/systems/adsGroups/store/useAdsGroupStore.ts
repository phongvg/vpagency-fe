import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { AdsGroup } from '@/@types/adsGroup'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type AdsGroupState = {
  filter: CommonFilterRequest
  adsGroups: AdsGroup[]
  selectedAdsGroup: AdsGroup | null
  drawerOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setAdsGroups: (adsGroups: AdsGroup[]) => void
  setSelectedAdsGroup: (adsGroup: AdsGroup | null) => void
  setDrawerOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
  clearFilter: () => void
}

export const initialAdsGroupState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  adsGroups: [],
  selectedAdsGroup: null,
  drawerOpen: false,
  deleteDialogOpen: false,
}

export const useAdsGroupStore = create<AdsGroupState>()(
  devtools((set, get) => ({
    ...initialAdsGroupState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setAdsGroups: (adsGroups) => set({ adsGroups }),
    setSelectedAdsGroup: (adsGroup) => set({ selectedAdsGroup: adsGroup }),
    setDrawerOpen: (open) => set({ drawerOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialAdsGroupState.filter }),
  })),
)
