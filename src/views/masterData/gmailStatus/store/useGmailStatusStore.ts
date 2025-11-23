import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type GmailStatusState = {
  filter: CommonFilterRequest
  gmailStatusId: string | null
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setGmailStatusId: (gmailStatusId: string | null) => void
  openDialog: (gmailStatusId?: string | null) => void
  closeDialog: () => void
  clearFilter: () => void
}

export const initialGmailStatusState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  projectStatusId: null,
  dialogOpen: false,
}

export const useGmailStatusStore = create<GmailStatusState>()(
  devtools((set, get) => ({
    ...initialGmailStatusState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setGmailStatusId: (gmailStatusId) => set({ gmailStatusId }),
    openDialog: (gmailStatusId) =>
      set({
        gmailStatusId: gmailStatusId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        gmailStatusId: null,
        dialogOpen: false,
      }),
    clearFilter: () => set({ filter: initialGmailStatusState.filter }),
  })),
)
