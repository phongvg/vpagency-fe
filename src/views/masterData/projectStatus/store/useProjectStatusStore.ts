import { CommonFilterRequest, SortOrder } from '@/@types/common'
import { ProjectStatus } from '@/@types/projectStatus'
import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

type ProjectStatusState = {
  filter: CommonFilterRequest
  projectStatuses: ProjectStatus[]
  selectedProjectStatus: ProjectStatus | null
  dialogOpen: boolean
  deleteDialogOpen: boolean

  setFilter: (filter: CommonFilterRequest) => void
  setSearch: (search: string) => void
  setProjectStatuses: (projectStatuses: ProjectStatus[]) => void
  setSelectedProjectStatus: (projectStatus: ProjectStatus | null) => void
  setDialogOpen: (open: boolean) => void
  setDeleteDialogOpen: (open: boolean) => void
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
  projectStatuses: [],
  selectedProjectStatus: null,
  dialogOpen: false,
  deleteDialogOpen: false,
}

export const useProjectStatusStore = create<ProjectStatusState>()(
  devtools((set, get) => ({
    ...initialProjectStatusState,

    setFilter: (filter) => set({ filter }),
    setSearch: (search) => {
      const currentFilter = get().filter
      set({ filter: { ...currentFilter, search, page: 1 } })
    },
    setProjectStatuses: (projectStatuses) => set({ projectStatuses }),
    setSelectedProjectStatus: (projectStatus) => set({ selectedProjectStatus: projectStatus }),
    setDialogOpen: (open) => set({ dialogOpen: open }),
    setDeleteDialogOpen: (open) => set({ deleteDialogOpen: open }),
    clearFilter: () => set({ filter: initialProjectStatusState.filter }),
  })),
)
