import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type GmailAccountState = {
  filter: CommonFilterRequest
  gmailAccountId: string | null
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setGmailAccountId: (gmailAccountId: string | null) => void
  openDialog: (gmailAccountId?: string | null) => void
  closeDialog: () => void
  clearFilter: () => void
}

export const initialGmailAccountState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  gmailAccountId: null,
  dialogOpen: false,
}

export const useGmailAccountStore = create<GmailAccountState>()(
  devtools((set, get) => ({
    ...initialGmailAccountState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setGmailAccountId: (gmailAccountId) => set({ gmailAccountId }),
    openDialog: (gmailAccountId) =>
      set({
        gmailAccountId: gmailAccountId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        gmailAccountId: null,
        dialogOpen: false,
      }),
    clearFilter: () => set({ filter: initialGmailAccountState.filter }),
  })),
)
