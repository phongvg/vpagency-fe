import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { UidStatus } from '@/@types/uidStatus'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type UidStatusState = {
  filter: CommonFilterRequest
  uidStatuses: UidStatus[]
  selectedUidStatus: UidStatus | null
  dialogOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setUidStatuses: (uidStatuses: UidStatus[]) => void
  setSelectedUidStatus: (uidStatus: UidStatus | null) => void
  setDialogOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
  clearFilter: () => void
}

export const initialUidStatusState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  uidStatuses: [],
  selectedUidStatus: null,
  dialogOpen: false,
  deleteDialogOpen: false,
}

export const useUidStatusStore = create<UidStatusState>()(
  devtools((set, get) => ({
    ...initialUidStatusState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setUidStatuses: (uidStatuses) => set({ uidStatuses }),
    setSelectedUidStatus: (uidStatus) => set({ selectedUidStatus: uidStatus }),
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialUidStatusState.filter }),
  })),
)
