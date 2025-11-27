import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { UpdateGmailAccountRequest } from '@/views/gmailAccounts/types/gmailAccount.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type GmailAccountState = {
  filter: CommonFilterRequest
  gmailAccountId: string | null
  dialogOpen: boolean
  dialogPreviewOpen: boolean
  gmailAccounts: UpdateGmailAccountRequest[]

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setGmailAccountId: (gmailAccountId: string | null) => void
  openDialog: (gmailAccountId?: string | null) => void
  closeDialog: () => void
  openPreviewDialog: () => void
  closePreviewDialog: () => void
  setGmailAccounts: (gmailAccounts: UpdateGmailAccountRequest[]) => void
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
  dialogPreviewOpen: false,
  gmailAccounts: [],
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
    openPreviewDialog: () => set({ dialogPreviewOpen: true }),
    closePreviewDialog: () =>
      set({
        dialogPreviewOpen: false,
        gmailAccounts: [],
      }),
    setGmailAccounts: (gmailAccounts) => set({ gmailAccounts }),
    clearFilter: () => set({ filter: initialGmailAccountState.filter }),
  })),
)
