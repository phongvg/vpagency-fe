import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProjectStatusState = {
  filter: CommonFilterRequest
  projectStatusId: string | null
  dialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setProjectStatusId: (projectStatusId: string | null) => void
  openDialog: (projectStatusId?: string | null) => void
  closeDialog: () => void
  clearFilter: () => void
}

export const initialProjectStatusState = {
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

export const useProjectStatusStore = create<ProjectStatusState>()(
  devtools((set, get) => ({
    ...initialProjectStatusState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setProjectStatusId: (projectStatusId) => set({ projectStatusId }),
    openDialog: (projectStatusId) =>
      set({
        projectStatusId: projectStatusId || null,
        dialogOpen: true,
      }),
    closeDialog: () =>
      set({
        projectStatusId: null,
        dialogOpen: false,
      }),
    clearFilter: () => set({ filter: initialProjectStatusState.filter }),
  })),
)
