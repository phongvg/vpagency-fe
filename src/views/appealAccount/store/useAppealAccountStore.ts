import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { UpdateAppealAccountRequest } from '@/views/appealAccount/types/appealAccount.type'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

export type AppealAccountFilterRequest = CommonFilterRequest & {
  email?: string
  uid?: string
  appealedBy?: string
  usedBy?: string
  appealPlatform?: string
  rarityLevel?: string
}

type AppealAccountState = {
  filter: AppealAccountFilterRequest
  appealAccountId: string | null
  dialogOpen: boolean
  dialogPreviewOpen: boolean
  appealAccounts: UpdateAppealAccountRequest[]

  setFilter: (filter: AppealAccountFilterRequest) => void
  setSearch: (search: string) => void
  setAppealAccountId: (appealAccountId: string | null) => void
  openDialog: (appealAccountId?: string | null) => void
  closeDialog: () => void
  openPreviewDialog: () => void
  closePreviewDialog: () => void
  setAppealAccounts: (appealAccounts: UpdateAppealAccountRequest[]) => void
  clearFilter: () => void
}

export const initialAppealAccountState = {
  filter: {
    search: '',
    page: 1,
    limit: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc' as SortOrder,
  },
  appealAccountId: null,
  dialogOpen: false,
  dialogPreviewOpen: false,
  appealAccounts: [],
}

export const useAppealAccountStore = create<AppealAccountState>()(
  devtools((set, get) => ({
    ...initialAppealAccountState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setAppealAccountId: (appealAccountId) => set({ appealAccountId }),
    openDialog: (appealAccountId) =>
      set({
        appealAccountId: appealAccountId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        appealAccountId: null,
        dialogOpen: false,
      }),
    openPreviewDialog: () => set({ dialogPreviewOpen: true }),
    closePreviewDialog: () =>
      set({
        dialogPreviewOpen: false,
        appealAccounts: [],
      }),
    setAppealAccounts: (appealAccounts) => set({ appealAccounts }),
    clearFilter: () => set({ filter: initialAppealAccountState.filter }),
  })),
)
