import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CommonFilterRequest } from '@/@types/common'

type FinalUrlState = {
  filter: CommonFilterRequest
  finalUrlId: string | null
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setFinalUrlId: (finalUrlId: string | null) => void
  openDialog: (finalUrlId?: string | null) => void
  closeDialog: () => void
  clearFilter: () => void
}

export const initialFinalUrlState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
  },
  finalUrlId: null,
  dialogOpen: false,
}

export const useFinalUrlStore = create<FinalUrlState>()(
  devtools((set, get) => ({
    ...initialFinalUrlState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setFinalUrlId: (finalUrlId) => set({ finalUrlId }),
    openDialog: (finalUrlId) =>
      set({
        finalUrlId: finalUrlId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        finalUrlId: null,
        dialogOpen: false,
      }),
    clearFilter: () => set({ filter: initialFinalUrlState.filter }),
  })),
)
