import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { GmailAccount } from '@/@types/gmailAccount'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type GmailAccountState = {
  filter: CommonFilterRequest
  gmailAccounts: GmailAccount[]
  selectedGmailAccount: GmailAccount | null
  dialogOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setGmailAccounts: (GmailAccounts: GmailAccount[]) => void
  setSelectedGmailAccount: (GmailAccount: GmailAccount | null) => void
  setDialogOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
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
  gmailAccounts: [],
  selectedGmailAccount: null,
  dialogOpen: false,
  deleteDialogOpen: false,
}

export const useGmailAccountStore = create<GmailAccountState>()(
  devtools((set, get) => ({
    ...initialGmailAccountState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setGmailAccounts: (gmailAccounts) => set({ gmailAccounts }),
    setSelectedGmailAccount: (gmailAccount) => set({ selectedGmailAccount: gmailAccount }),
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialGmailAccountState.filter }),
  })),
)
